export class UserMembershipId {

  constructor(
    private _value: string
  ) {}

  public static of(value: string) {
    return new UserMembershipId(value);
  }

  get value(): string {
    return this._value;
  }
}