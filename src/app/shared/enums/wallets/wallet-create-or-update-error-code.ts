import { ErrorMessagesMap } from '../../rxjs-operators/handle-fin-back-http-error';

export enum WalletCreateOrUpdateErrorCode
{
  NameIsRequired = 0,
  NameAlreadyInUse = 1,
  NameTooLong = 2,
  ColorIsRequired = 3,
  ColorTooLong = 4,
  IconIsRequired = 5,
  IconTooLong = 6,
  WalletNotFound = 7,
  FinancialInstitutionNotFound =  8,
  FinancialInstitutionInactivated =  9
}

export const walletCreateOrUpdateErrorCodeMessages: ErrorMessagesMap<WalletCreateOrUpdateErrorCode> = new Map([
  [WalletCreateOrUpdateErrorCode.NameAlreadyInUse, { message: 'finCore.features.wallet.errors.nameAlreadyInUse' }],
]);