export type IEnvironment = {
  production: boolean;
  apiUrl: string;
  version: string;
  features: {
    googleLoginEnabled: boolean;
    passwordResetEnabled: boolean;
  };
};
