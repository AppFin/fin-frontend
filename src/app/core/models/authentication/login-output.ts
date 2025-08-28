import { LoginErrorCode } from '../../enums/authentication/login-error-code';

export type LoginOutput = {
  success: boolean;
  token: string;
  refreshToken: string;
  errorCode: LoginErrorCode | null;
};
