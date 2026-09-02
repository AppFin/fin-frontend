import { ErrorMessagesMap } from "../../rxjs-operators/handle-fin-back-http-error";

export enum CreditChargeCreateOrUpdateErrorCode {
  DescriptionTooLong = 'DescriptionTooLong',
  DescriptionIsRequired = 'DescriptionIsRequired',
  CreditCardNotFound = 'CreditCardNotFound',
  CreditCardInactive = 'CreditCardInactive',
  ValueMustBeGreaterThanZero = 'ValueMustBeGreaterThanZero',
  NumberOfInstallmentsMustBePositive = 'NumberOfInstallmentsMustBePositive',
  SomeCategoriesNotFound = 'SomeCategoriesNotFound',
  SomeCategoriesInactive = 'SomeCategoriesInactive',
  SomePeopleNotFound = 'SomePeopleNotFound',
  SomePeopleInactive = 'SomePeopleInactive',
  PeopleSplitRange = 'PeopleSplitRange',
}

export const creditChargeCreateOrUpdateErrorCodeMessages: ErrorMessagesMap<CreditChargeCreateOrUpdateErrorCode> = {
  [CreditChargeCreateOrUpdateErrorCode.DescriptionTooLong]:
    'Description must have less than 100 characters.',
  [CreditChargeCreateOrUpdateErrorCode.DescriptionIsRequired]:
    'Description is required.',
  [CreditChargeCreateOrUpdateErrorCode.CreditCardNotFound]:
    'Credit card not found',
  [CreditChargeCreateOrUpdateErrorCode.CreditCardInactive]:
    'Credit card is inactive',
  [CreditChargeCreateOrUpdateErrorCode.ValueMustBeGreaterThanZero]:
    'Value must be greater than zero.',
  [CreditChargeCreateOrUpdateErrorCode.NumberOfInstallmentsMustBePositive]:
    'Number of installments must be at least 1.',
  [CreditChargeCreateOrUpdateErrorCode.SomeCategoriesNotFound]:
    'Some categories was not found',
  [CreditChargeCreateOrUpdateErrorCode.SomeCategoriesInactive]:
    'Some categories is inactive',
  [CreditChargeCreateOrUpdateErrorCode.SomePeopleNotFound]:
    'Some people was not found',
  [CreditChargeCreateOrUpdateErrorCode.SomePeopleInactive]:
    'Some people is inactive',
  [CreditChargeCreateOrUpdateErrorCode.PeopleSplitRange]:
    'Financial split between people must be greater than or equal to 0 and less than or equal to 100',
};
