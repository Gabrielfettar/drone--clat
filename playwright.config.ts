import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:3200',
    trace: 'off',
    launchOptions: { executablePath: process.env.PW_CHROMIUM || undefined, args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] },
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: { command: 'LEAD_LOCAL_SINK=1 RATE_LIMIT_MAX=6 npx next start -p 3200', url: 'http://localhost:3200', reuseExistingServer: true, timeout: 120_000 },
});
