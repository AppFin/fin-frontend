import { ErrorMessagesMap } from '../../rxjs-operators/handle-fin-back-http-error';

export enum CreditChargeCreateOrUpdateErrorCode {
  CreditChargeNotFound = 0,
  DescriptionTooLong = 1,
  DescriptionIsRequired = 2,
  CreditCardNotFound = 3,
  CreditCardInactive = 4,
  ValueMustBeGreaterThanZero = 5,
  NumberOfInstallmentsMustBePositive = 6,
  SomeCategoriesNotFound = 7,
  SomeCategoriesInactive = 8,
  SomePeopleNotFound = 9,
  SomePeopleInactive = 10,
  PeopleSplitRange = 11,
}

export const creditChargeCreateOrUpdateErrorCodeMessages: ErrorMessagesMap<CreditChargeCreateOrUpdateErrorCode> =
  new Map([
    [
      CreditChargeCreateOrUpdateErrorCode.DescriptionTooLong,
      { message: 'Description must have less than 100 characters.' },
    ],
    [
      CreditChargeCreateOrUpdateErrorCode.DescriptionIsRequired,
      { message: 'Description is required.' },
    ],
    [
      CreditChargeCreateOrUpdateErrorCode.CreditCardNotFound,
      { message: 'Credit card not found' },
    ],
    [
      CreditChargeCreateOrUpdateErrorCode.CreditCardInactive,
      { message: 'Credit card is inactive' },
    ],
    [
      CreditChargeCreateOrUpdateErrorCode.ValueMustBeGreaterThanZero,
      { message: 'Value must be greater than zero.' },
    ],
    [
      CreditChargeCreateOrUpdateErrorCode.NumberOfInstallmentsMustBePositive,
      { message: 'Number of installments must be at least 1.' },
    ],
    [
      CreditChargeCreateOrUpdateErrorCode.SomeCategoriesNotFound,
      { message: 'Some categories was not found' },
    ],
    [
      CreditChargeCreateOrUpdateErrorCode.SomeCategoriesInactive,
      { message: 'Some categories is inactive' },
    ],
    [
      CreditChargeCreateOrUpdateErrorCode.SomePeopleNotFound,
      { message: 'Some people was not found' },
    ],
    [
      CreditChargeCreateOrUpdateErrorCode.SomePeopleInactive,
      { message: 'Some people is inactive' },
    ],
    [
      CreditChargeCreateOrUpdateErrorCode.PeopleSplitRange,
      {
        message:
          'Financial split between people must be greater than or equal to 0 and less than or equal to 100',
      },
    ],
  ]);
