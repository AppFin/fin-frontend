import { ErrorMessagesMap } from '../../rxjs-operators/handle-fin-back-http-error';

export enum CreditCardToggleInactiveErrorCode {
  CreditCardNotFound = 0,
}

export const CreditCardToggleInactiveErrorCodeMessages: ErrorMessagesMap<CreditCardToggleInactiveErrorCode> =
  new Map();
