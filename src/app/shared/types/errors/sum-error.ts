import { MessageError } from './message-erro';

export type SumError = MessageError & {
  sum: number;
  min?: number;
  max?: number;
};
