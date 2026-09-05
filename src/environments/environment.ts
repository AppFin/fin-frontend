import { IEnvironment } from './i-environment';

export const environment: IEnvironment = {
  production: false,
  apiUrl: 'https://localhost:7122/v1',
  version: 'dev',
  // Portfolio demo mode: keep in sync with the backend's ApiSettings:DemoMode flag.
  features: {
    googleLoginEnabled: false,
    passwordResetEnabled: false,
  },
};
