export class UserStartCreateOutput {
  public creationToken: string;
  public email: string;
  public sentEmailDateTime: Date;

  /** Only present in portfolio demo mode, since no real email is sent with the code. */
  public confirmationCode?: string;

  constructor(data?: Partial<UserStartCreateOutput>) {
    if (!!data) Object.assign(this, data);
    if (data?.sentEmailDateTime)
      this.sentEmailDateTime = new Date(data.sentEmailDateTime);
  }
}
