import { ErrorMessagesMap } from '../../rxjs-operators/handle-fin-back-http-error';

export enum TitleDeleteErrorCode {
  TitleNotFound = 0
}

export const TitleDeleteErrorCodeMessages: ErrorMessagesMap<TitleDeleteErrorCode> =
  new Map([]);
