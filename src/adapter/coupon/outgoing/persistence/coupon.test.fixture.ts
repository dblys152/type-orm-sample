import * as moment from "moment-timezone";
import Coupon from "../../../../domain/coupon/model/coupon";
import { CouponDiscount } from "../../../../domain/coupon/model/coupon.discount";
import { CouponDiscountType } from "../../../../domain/coupon/model/coupon.discount.type";
import { CouponDiscountValue } from "../../../../domain/coupon/model/coupon.discount.value";
import { CouponId } from "../../../../domain/coupon/model/coupon.id";
import { CouponType } from "../../../../domain/coupon/model/coupon.type";

export class CouponTestFixture {
  public static readonly NOW: moment.Moment = moment().tz('Asia/Seoul');
  public static readonly COUPON_ID: CouponId = CouponId.of('COUPON_ID');
  public static readonly PERCENTAGE_DISCOUNT: CouponDiscount = CouponDiscount.of(CouponDiscountType.PERCENTAGE, CouponDiscountValue.of(50));
  public static readonly COUPON: Coupon = Coupon.of(this.COUPON_ID, CouponType.PODUCT_DISCOUNT, this.PERCENTAGE_DISCOUNT, this.NOW, this.NOW, null, 0);
}