import { ErrorMessagesMap } from '../../rxjs-operators/handle-fin-back-http-error';

export enum CreditChargeDeleteErrorCode {
  CreditChargeNotFound = 0,
}

export const CreditChargeDeleteErrorCodeMessages: ErrorMessagesMap<CreditChargeDeleteErrorCode> =
  new Map([
    [
      CreditChargeDeleteErrorCode.CreditChargeNotFound,
      { message: 'Credit charge not found' },
    ],
  ]);
