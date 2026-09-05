export enum CreditChargeDeleteErrorCode {
  CreditChargeNotFound = 'CreditChargeNotFound',
}

export const CreditChargeDeleteErrorCodeMessages: Record<
  CreditChargeDeleteErrorCode,
  string
> = {
  [CreditChargeDeleteErrorCode.CreditChargeNotFound]: 'Credit charge not found',
};
