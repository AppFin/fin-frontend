export enum LoginErrorCode {
  EmailNotFound = 1,
  DoNotHasPassword = 2,
  MaxAttemptsReached = 3,
  InactivatedUser = 4,
  InvalidPassword = 5,
  InvalidRefreshToken = 6,
  DifferentGoogleAccountLinked = 7,
  CantCreateUser = 8,
}
