import { CouponId } from "./coupon.id";
import { CouponType } from "./coupon.type";
import { CouponDiscount } from "./coupon.discount";
import { IdGenerator } from "../../gen/id.generator";
import moment from "moment";

export default class Coupon {

  private constructor(
    private _id: CouponId,
    private _couponType: CouponType,
    private _discount: CouponDiscount,
    private _createdAt: moment.Moment,
    private _modifiedAt: moment.Moment,
    private _deletedAt: moment.Moment | null,
    private _version: number | null
  ) {}

  public static create(
    couponType: CouponType,
    discount: CouponDiscount,
  ): Coupon {
    const id: CouponId = CouponId.of(new IdGenerator().generateRandomId());
    return new Coupon(id, couponType, discount, null, null, null, null);
  }

  public static of(
    id: CouponId,
    couponType: CouponType,
    discount: CouponDiscount,
    createdAt: moment.Moment,
    modifiedAt: moment.Moment,
    deletedAt: moment.Moment | null,
    version: number | null
  ): Coupon {
    return new Coupon(id, couponType, discount, createdAt, modifiedAt, deletedAt, version);
  }

  get id(): CouponId {
    return this._id;
  }

  get couponType(): CouponType {
    return this._couponType;
  }

  get discount(): CouponDiscount {
    return this._discount;
  }

  get createdAt(): moment.Moment {
    return this._createdAt;
  }

  get modifiedAt(): moment.Moment {
    return this._modifiedAt;
  }

  get deletedAt(): moment.Moment | null {
    return this._deletedAt;
  }

  get version(): number | null {
    return this._version;
  }
}