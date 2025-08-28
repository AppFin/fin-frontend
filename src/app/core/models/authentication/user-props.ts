export class UserProps {
  public name: string;
  public userId: string;
  public role: 'Admin' | 'User';
  public imageUrl: string;
  public tenantId: string;

  constructor(props: Partial<UserProps> = {}) {
    Object.assign(this, props);
    Object.freeze(this);
  }

  public get isAdmin(): boolean {
    return this.role === 'Admin';
  }
}
