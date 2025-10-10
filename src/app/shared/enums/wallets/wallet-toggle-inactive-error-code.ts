import { ErrorMessagesMap } from '../../rxjs-operators/handle-fin-back-http-error';

export enum WalletToggleInactiveErrorCode {
  WalletNotFound = 0,
  WalletInUseByActivatedCreditCards = 1,
}

export const WalletToggleInactiveErrorCodeMessages: ErrorMessagesMap<WalletToggleInactiveErrorCode> =
  new Map([
    [
      WalletToggleInactiveErrorCode.WalletInUseByActivatedCreditCards,
      { message: 'finApp.features.wallet.errors.walletInUseByActivatedCreditCards' },
    ],
  ]);