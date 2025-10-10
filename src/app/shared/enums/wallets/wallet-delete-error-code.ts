import { ErrorMessagesMap } from '../../rxjs-operators/handle-fin-back-http-error';

export enum WalletDeleteErrorCode {
  WalletNotFound = 0,
  WalletInUseByTitles = 1,
  WalletInUseByCreditCards = 2,
  WalletInUseByCreditCardsAndTitle = 3,
}

export const WalletDeleteErrorCodeMessages: ErrorMessagesMap<WalletDeleteErrorCode> =
  new Map([
    [
      WalletDeleteErrorCode.WalletInUseByTitles,
      { message: 'finApp.features.wallet.errors.walletInUseByTitles' },
    ],
    [
      WalletDeleteErrorCode.WalletInUseByCreditCards,
      { message: 'finApp.features.wallet.errors.walletInUseByCreditCards' },
    ],
    [
      WalletDeleteErrorCode.WalletInUseByCreditCardsAndTitle,
      {
        message:
          'finApp.features.wallet.errors.walletInUseByCreditCardsAndTitle',
      },
    ],
  ]);