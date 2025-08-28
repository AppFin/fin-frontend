export class UserStartCreateOutput {
  public creationToken: string;
  public email: string;
  public sentEmailDateTime: Date;

  constructor(data?: Partial<UserStartCreateOutput>) {
    if (!!data) Object.assign(this, data);
    if (data?.sentEmailDateTime)
      this.sentEmailDateTime = new Date(data.sentEmailDateTime);
  }
}
