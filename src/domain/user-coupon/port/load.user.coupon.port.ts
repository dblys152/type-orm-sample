import { UserCoupon } from "../model/user.coupon";
import { UserCouponId } from "../model/user.coupon.id";

export interface LoadUserCouponPort {
  findById(id: UserCouponId): Promise<UserCoupon>;
}