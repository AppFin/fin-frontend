import { ErrorMessagesMap } from '../../rxjs-operators/handle-fin-back-http-error';

export enum CreditCardDeleteErrorCode {
  CreditCardNotFound = 0,
  CreditCardInUse = 1
}

export const CreditCardDeleteErrorCodeMessages: ErrorMessagesMap<CreditCardDeleteErrorCode> =
  new Map([
    [
      CreditCardDeleteErrorCode.CreditCardInUse,
      { message: 'finCore.features.creditCard.errors.creditCardInUse' },
    ]
  ]);