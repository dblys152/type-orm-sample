import { CouponDiscountType } from "./coupon.discount.type";
import { CouponDiscountValue } from "./coupon.discount.value";

export class CouponDiscount {

  constructor(
    private _discountType: CouponDiscountType,
    private _discountValue: CouponDiscountValue,
  ) {}

  public static of(discountType: CouponDiscountType, discountValue: CouponDiscountValue) {
    return new CouponDiscount(discountType, discountValue);
  }

  public getDiscountedAmount(price: number): number {
    const discountedAmount = this._discountType === CouponDiscountType.PERCENTAGE 
      ? price - Number((price * this._discountValue.value) / 100)
      : price - this._discountValue.value;
    return this.isGreaterThanZero(discountedAmount) ? discountedAmount : 0;
  }

  private isGreaterThanZero(price: number): boolean {
    return price > 0;
  }

  get discountType(): CouponDiscountType {
    return this._discountType;
  }

  get discountValue(): CouponDiscountValue {
    return this._discountValue;
  }
}