"""Génère le classeur back-office (importé ensuite dans Google Sheets)."""
import sys
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.formatting.rule import FormulaRule

NAVY, BLUE, MIST = '0A1F37', '0091EB', 'EEF3F7'
HEAD = ['Reçu le', 'Référence', 'Statut', 'Priorité', 'Nom', 'Téléphone', 'E-mail', 'Code postal', 'Commune', 'Adresse',
        'Type de client', 'Bâtiment', 'Intervention', 'Surface (m²)', 'Matériau', 'Hauteur', 'État', 'Accès', 'Message',
        'Photos', 'Diagnostic auto', "Page d'origine", 'Responsable', 'Prochaine action', 'Date de relance', 'Montant devis (€ HT)', 'Notes internes']
WIDTH = {'Reçu le': 17, 'Référence': 19, 'Statut': 16, 'Priorité': 10, 'Nom': 20, 'Téléphone': 15, 'E-mail': 26, 'Code postal': 11,
         'Commune': 16, 'Adresse': 26, 'Type de client': 14, 'Bâtiment': 20, 'Intervention': 26, 'Message': 36, 'Photos': 16,
         'Diagnostic auto': 40, "Page d'origine": 22, 'Prochaine action': 24, 'Notes internes': 36}
STATUTS = ['Nouveau', 'À rappeler', 'Étude en cours', 'Visite planifiée', 'Devis envoyé', 'Gagné', 'Perdu', 'Hors zone']
COL = {h: chr(65 + i) if i < 26 else 'A' + chr(65 + i - 26) for i, h in enumerate(HEAD)}

wb = Workbook()
ws = wb.active; ws.title = 'Demandes'
ws.append(HEAD)
for c in ws[1]:
    c.font = Font(bold=True, color='FFFFFF'); c.fill = PatternFill('solid', fgColor=NAVY)
    c.alignment = Alignment(vertical='center', wrap_text=True)
ws.row_dimensions[1].height = 32
for h, col in COL.items():
    ws.column_dimensions[col].width = WIDTH.get(h, 14)
ws.freeze_panes = 'C2'
ws.auto_filter.ref = f"A1:{COL[HEAD[-1]]}1"
N = 2000
for h, fmt in [('Reçu le', 'dd/mm/yyyy hh:mm'), ('Date de relance', 'dd/mm/yyyy'), ('Montant devis (€ HT)', '#,##0 €')]:
    for r in range(2, N): ws[f"{COL[h]}{r}"].number_format = fmt
dv = DataValidation(type='list', formula1='"' + ','.join(STATUTS) + '"', allow_blank=True); ws.add_data_validation(dv); dv.add(f"{COL['Statut']}2:{COL['Statut']}{N}")
dp = DataValidation(type='list', formula1='"Haute,Normale,Basse"', allow_blank=True); ws.add_data_validation(dp); dp.add(f"{COL['Priorité']}2:{COL['Priorité']}{N}")
s, rng = COL['Statut'], f"A2:{COL[HEAD[-1]]}{N}"
for val, color in [('Nouveau', 'DCEFFC'), ('Gagné', 'DDF3E4'), ('Perdu', 'F1F1F1'), ('Hors zone', 'F1F1F1')]:
    ws.conditional_formatting.add(rng, FormulaRule(formula=[f'${s}2="{val}"'], fill=PatternFill('solid', fgColor=color)))
ws.conditional_formatting.add(f"{COL['Priorité']}2:{COL['Priorité']}{N}", FormulaRule(formula=[f'${COL["Priorité"]}2="Haute"'], font=Font(bold=True, color='B3261E')))
rel = COL['Date de relance']
ws.conditional_formatting.add(f"{rel}2:{rel}{N}", FormulaRule(formula=[f'AND(${rel}2<>"",${rel}2<=TODAY(),${s}2<>"Gagné",${s}2<>"Perdu")'], font=Font(bold=True, color='B3261E')))

# Tableau de bord
d = wb.create_sheet('Tableau de bord', 0)
d.column_dimensions['A'].width = 34; d.column_dimensions['B'].width = 16; d.column_dimensions['C'].width = 4; d.column_dimensions['D'].width = 30; d.column_dimensions['E'].width = 14
d['A1'] = 'Drone Éclat · Demandes de devis'; d['A1'].font = Font(bold=True, size=16, color=NAVY)
d['A2'] = 'Mis à jour automatiquement à chaque demande reçue depuis le site.'; d['A2'].font = Font(italic=True, color='5B6B7C')
R = "Demandes!"
def kpi(row, label, formula, fmt=None):
    d[f'A{row}'] = label; d[f'B{row}'] = formula; d[f'B{row}'].font = Font(bold=True, size=13, color=NAVY)
    if fmt: d[f'B{row}'].number_format = fmt
d['A4'] = 'Vue d’ensemble'; d['A4'].font = Font(bold=True, color=BLUE)
kpi(5, 'Demandes reçues (total)', f'=COUNTA({R}B2:B)')
kpi(6, 'Demandes ce mois-ci', f'=COUNTIFS({R}A2:A,">="&DATE(YEAR(TODAY()),MONTH(TODAY()),1))')
kpi(7, 'Demandes des 7 derniers jours', f'=COUNTIFS({R}A2:A,">="&(TODAY()-7))')
kpi(8, 'À traiter (Nouveau)', f'=COUNTIF({R}C2:C,"Nouveau")')
kpi(9, 'Relances en retard', f'=COUNTIFS({R}{rel}2:{rel},"<="&TODAY(),{R}C2:C,"<>Gagné",{R}C2:C,"<>Perdu",{R}{rel}2:{rel},"<>")')
kpi(10, 'Taux de transformation (gagnés / devis tranchés)', f'=IFERROR(COUNTIF({R}C2:C,"Gagné")/(COUNTIF({R}C2:C,"Gagné")+COUNTIF({R}C2:C,"Perdu")),"—")', '0%')
m = COL['Montant devis (€ HT)']
kpi(11, 'Chiffre d’affaires signé (€ HT)', f'=SUMIF({R}C2:C,"Gagné",{R}{m}2:{m})', '#,##0 €')
kpi(12, 'Devis en attente de réponse (€ HT)', f'=SUMIF({R}C2:C,"Devis envoyé",{R}{m}2:{m})', '#,##0 €')
d['D4'] = 'Par statut'; d['D4'].font = Font(bold=True, color=BLUE)
for i, st in enumerate(STATUTS):
    d[f'D{5+i}'] = st; d[f'E{5+i}'] = f'=COUNTIF({R}C2:C,D{5+i})'
d['A14'] = 'Par intervention'; d['A14'].font = Font(bold=True, color=BLUE)
iv = COL['Intervention']
for i, sv in enumerate(['Démoussage / traitement de toiture', 'Nettoyage de façade', 'Entretien de bardage', 'Autre demande']):
    d[f'A{15+i}'] = sv; d[f'B{15+i}'] = f'=COUNTIF({R}{iv}2:{iv},A{15+i})'
d['D14'] = 'Par type de client'; d['D14'].font = Font(bold=True, color=BLUE)
tc = COL['Type de client']
for i, t in enumerate(['Particulier', 'Professionnel']):
    d[f'D{15+i}'] = t; d[f'E{15+i}'] = f'=COUNTIF({R}{tc}2:{tc},D{15+i})'

# Mode d'emploi
g = wb.create_sheet('Mode d’emploi')
g.column_dimensions['A'].width = 110
lines = [
 ('Mode d’emploi du back-office', True),
 ('Chaque demande envoyée depuis le formulaire du site arrive automatiquement en bas de l’onglet « Demandes », avec le statut « Nouveau ».', False),
 ('Les photos jointes sont rangées dans le dossier Drive « Photos devis », un sous-dossier par référence (lien dans la colonne Photos).', False),
 ('', False),
 ('Suivi d’une demande', True),
 ('1. Changez le Statut au fil du dossier : Nouveau → À rappeler → Étude en cours → Visite planifiée → Devis envoyé → Gagné / Perdu (ou Hors zone).', False),
 ('2. Remplissez Responsable, Prochaine action et Date de relance. Une date de relance dépassée s’affiche en rouge.', False),
 ('3. Saisissez le Montant devis (€ HT) dès que le devis part : le tableau de bord calcule le chiffre signé et en attente.', False),
 ('Ne renommez pas les colonnes A à V (le site écrit dedans par leur nom). Vous pouvez ajouter des colonnes à droite.', False),
 ('', False),
 ('Installation (une seule fois, environ 10 minutes)', True),
 ('1. Extensions > Apps Script. Remplacez le contenu de Code.gs par le fichier Code.gs fourni (dossier integrations/google-sheets du site, copie dans ce dossier Drive).', False),
 ('2. Roue dentée « Paramètres du projet » > Propriétés du script : LEADS_SECRET = une longue chaîne aléatoire ; NOTIFY_EMAIL = l’adresse qui reçoit les alertes.', False),
 ('3. Exécutez la fonction testInstallation et acceptez les autorisations demandées (Sheets, Drive, envoi d’e-mail).', False),
 ('4. Déployer > Nouveau déploiement > Application Web. Exécuter en tant que : Moi. Accès : Tout le monde. Copiez l’URL qui finit par /exec.', False),
 ('5. Sur l’hébergement du site, renseignez GOOGLE_SHEETS_WEBHOOK_URL (l’URL /exec) et LEADS_WEBHOOK_SECRET (la même chaîne que LEADS_SECRET).', False),
 ('', False),
 ('Données personnelles', True),
 ('Ce classeur contient des données clients : ne le partagez qu’avec l’équipe. Supprimez les demandes non abouties au bout de 3 ans (durée indiquée dans la politique de confidentialité du site).', False),
]
for i, (t, b) in enumerate(lines, 1):
    c = g[f'A{i}']; c.value = t; c.alignment = Alignment(wrap_text=True, vertical='top')
    if b: c.font = Font(bold=True, size=13 if i == 1 else 11, color=NAVY)
wb.save(sys.argv[1])
print('ok')
