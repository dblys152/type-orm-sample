import Coupon from "../model/coupon";
import { CouponId } from "../model/coupon.id";

export interface LoadCouponPort {
  findById(id: CouponId): Promise<Coupon>;
}