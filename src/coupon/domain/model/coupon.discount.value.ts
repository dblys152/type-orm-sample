export class CouponDiscountValue {

  constructor(
    private _value: number
  ) {}

  public static of(value: number) {
    return new CouponDiscountValue(value);
  }

  get value(): number {
    return this._value;
  }
}