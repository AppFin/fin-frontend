import { ErrorMessagesMap } from '../../rxjs-operators/handle-fin-back-http-error';

export enum TitleCreateOrUpdateErrorCode {
  TitleNotFound = 0,
  DescriptionTooLong = 1,
  DescriptionIsRequired = 2,
  WalletNotFound = 3,
  WalletInactive = 4,
  TitleDateMustBeEqualOrAfterWalletCreation = 5,
  SomeCategoriesNotFound = 6,
  SomeCategoriesInactive = 7,
  SomeCategoriesHasIncompatibleTypes = 8,
  ValueMustBeGraterThanZero = 9,
  DuplicateTitleInSameDateTimeMinute = 10,
  SomePeopleNotFound = 11,
  SomePeopleInactive = 12,
  PeopleSplitRange = 13,
}

export const titleCreateOrUpdateErrorCodeMessages: ErrorMessagesMap<TitleCreateOrUpdateErrorCode> =
  new Map([
    [
      TitleCreateOrUpdateErrorCode.TitleDateMustBeEqualOrAfterWalletCreation,
      {
        message:
          'finCore.features.title.errors.dateMustBeEqualOrAfterWalletCreation',
      },
    ],
    [
      TitleCreateOrUpdateErrorCode.DuplicateTitleInSameDateTimeMinute,
      {
        message:
          'finCore.features.title.errors.duplicateTitleInSameDateTimeMinute',
      },
    ],
  ]);
