import { MessageError } from './message-erro';

export type DuplicatedError = MessageError & {
  field: string;
  duplicatedValues: any[];
  indices: number[];
};
