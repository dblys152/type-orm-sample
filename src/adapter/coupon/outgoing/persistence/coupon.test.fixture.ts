import * as moment from "moment-timezone";
import Coupon from "../../../../domain/coupon/model/coupon";
import { CouponDiscount } from "../../../../domain/coupon/model/coupon.discount";
import { CouponDiscountType } from "../../../../domain/coupon/model/coupon.discount.type";
import { CouponDiscountValue } from "../../../../domain/coupon/model/coupon.discount.value";
import { CouponId } from "../../../../domain/coupon/model/coupon.id";
import { CouponType } from "../../../../domain/coupon/model/coupon.type";

class CouponTestFixture {
  public NOW: moment.Moment = moment().tz('Asia/Seoul');
  public COUPON_ID: CouponId = CouponId.of('COUPON_ID');
  public PERCENTAGE_DISCOUNT: CouponDiscount = CouponDiscount.of(CouponDiscountType.PERCENTAGE, CouponDiscountValue.of(50));
  public COUPON: Coupon = Coupon.of(this.COUPON_ID, CouponType.PODUCT_DISCOUNT, this.PERCENTAGE_DISCOUNT, this.NOW, this.NOW, null, 0);
}

const couponTestFixture = new CouponTestFixture();
export default couponTestFixture;