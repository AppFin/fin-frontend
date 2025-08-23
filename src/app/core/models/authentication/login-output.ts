import { LoginErrorCode } from '../../enums/login-error-code';

export type LoginOutput = {
  success: boolean;
  token: string;
  refreshToken: string;
  errorCode: LoginErrorCode | null;
};
