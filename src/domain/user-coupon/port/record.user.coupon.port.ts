import { UserCoupon } from "../model/user.coupon";

export interface RecordUserCouponPort {
  save(coupon: UserCoupon): Promise<UserCoupon>;
}