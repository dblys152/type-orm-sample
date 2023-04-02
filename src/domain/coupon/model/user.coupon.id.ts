export class UserCouponId {

  constructor(
    private _value: string
  ) {}

  public static of(value: string) {
    return new UserCouponId(value);
  }

  get value(): string {
    return this._value;
  }
}