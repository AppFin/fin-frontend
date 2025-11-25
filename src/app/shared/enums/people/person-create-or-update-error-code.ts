import { ErrorMessagesMap } from '../../rxjs-operators/handle-fin-back-http-error';

export enum PersonCreateOrUpdateErrorCode {
  NameIsRequired = 0,
  NameAlreadyInUse = 1,
  NameTooLong = 2,
  PersonNotFound = 4,
}

export const personCreateOrUpdateErrorCodeMessages: ErrorMessagesMap<PersonCreateOrUpdateErrorCode> =
  new Map([
    [
      PersonCreateOrUpdateErrorCode.NameAlreadyInUse,
      { message: 'finCore.features.person.errors.nameAlreadyInUse' },
    ],
  ]);
