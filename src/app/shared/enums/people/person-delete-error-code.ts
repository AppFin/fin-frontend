import { ErrorMessagesMap } from '../../rxjs-operators/handle-fin-back-http-error';

export enum PersonDeleteErrorCode {
  PersonInUse = 0,
  PersonNotFound = 1,
}

export const PersonDeleteErrorCodeMessages: ErrorMessagesMap<PersonDeleteErrorCode> =
  new Map([
    [
      PersonDeleteErrorCode.PersonInUse,
      { message: 'finCore.features.person.errors.personInUse' },
    ],
  ]);
