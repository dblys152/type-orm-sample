import Coupon from "../model/coupon";

export interface RecordCouponPort {
  save(coupon: Coupon): Promise<Coupon>;
}