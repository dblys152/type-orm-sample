import * as moment from "moment-timezone";
import Coupon from "../../../../domain/coupon/model/coupon";
import { CouponDiscount } from "../../../../domain/coupon/model/coupon.discount";
import { CouponDiscountType } from "../../../../domain/coupon/model/coupon.discount.type";
import { CouponDiscountValue } from "../../../../domain/coupon/model/coupon.discount.value";
import { CouponId } from "../../../../domain/coupon/model/coupon.id";
import { CouponType } from "../../../../domain/coupon/model/coupon.type";
import { UserCoupon } from "../../../../domain/user-coupon/model/user.coupon";
import { UserCouponId } from "../../../../domain/user-coupon/model/user.coupon.id";
import { UserCouponPeriod } from "../../../../domain/user-coupon/model/user.coupon.period";
import { UserCouponStatus } from "../../../../domain/user-coupon/model/user.coupon.status";
import { UserId } from "../../../../domain/user-coupon/model/user.id";

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