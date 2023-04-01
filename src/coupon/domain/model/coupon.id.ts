export class CouponId {

  constructor(
    private _value: string
  ) {}

  public static of(value: string) {
    return new CouponId(value);
  }

  get value(): string {
    return this._value;
  }
}