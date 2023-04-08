import * as moment from "moment-timezone";
import Coupon from "../../coupon/model/coupon";
import { CouponDiscount } from "../../coupon/model/coupon.discount";
import { CouponDiscountType } from "../../coupon/model/coupon.discount.type";
import { CouponDiscountValue } from "../../coupon/model/coupon.discount.value";
import { CouponId } from "../../coupon/model/coupon.id";
import { CouponType } from "../../coupon/model/coupon.type";
import { UserCoupon } from "./user.coupon";
import { UserCouponId } from "./user.coupon.id";
import { UserCouponPeriod } from "./user.coupon.period";
import { UserCouponStatus } from "./user.coupon.status";
import { UserId } from "./user.id";

export class UserCouponTestFixture {
  public static readonly NOW: moment.Moment = moment().tz('Asia/Seoul');
  public static readonly COUPON_ID: CouponId = CouponId.of('COUPON_ID');
  public static readonly PERCENTAGE_DISCOUNT: CouponDiscount = CouponDiscount.of(CouponDiscountType.PERCENTAGE, CouponDiscountValue.of(50));
  public static readonly COUPON: Coupon = Coupon.of(this.COUPON_ID, CouponType.PODUCT_DISCOUNT, this.PERCENTAGE_DISCOUNT, this.NOW, this.NOW, null, 0);

  public static readonly USER_COUPON_ID: UserCouponId = UserCouponId.of('USER_COUPON_ID');
  public static readonly USER_ID: UserId = UserId.of('USER_ID');
  public static readonly USER_COUPON_PERIOD: UserCouponPeriod = UserCouponPeriod.of(this.NOW, moment().tz('Asia/Seoul').add(30, 'day'));
  public static readonly AVAILABLE_USER_COUPON: UserCoupon = UserCoupon.of(this.USER_COUPON_ID, this.USER_ID, this.COUPON, UserCouponStatus.AVAILABLE, this.USER_COUPON_PERIOD, this.NOW, this.NOW, 0);
}