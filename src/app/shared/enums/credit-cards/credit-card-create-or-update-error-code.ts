import { ErrorMessagesMap } from '../../rxjs-operators/handle-fin-back-http-error';

export enum CreditCardCreateOrUpdateErrorCode
{
  NameIsRequired = 0,
  NameAlreadyInUse = 1,
  NameTooLong = 2,
  ColorIsRequired = 3,
  ColorTooLong = 4,
  IconIsRequired = 5,
  IconTooLong = 6,
  CreditCardNotFound = 7,

  FinancialInstitutionNotFound =  8,
  FinancialInstitutionInactivated =  9,

  DebitWalletNotFound =  10,
  DebitWalletInactivated =  11,

  CardBrandNotFound =  12,

  LimitMinValueZero =  13,
  DueDayOutOfRange =  14,
  ClosingDayOutOfRange =  15
}

export const creditCardCreateOrUpdateErrorCodeMessages: ErrorMessagesMap<CreditCardCreateOrUpdateErrorCode> = new Map([
  [CreditCardCreateOrUpdateErrorCode.NameAlreadyInUse, { message: 'finCore.features.creditCard.errors.nameAlreadyInUse' }],
]);