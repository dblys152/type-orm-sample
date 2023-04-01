import { CouponId } from "./coupon.id";
import { CouponType } from "./coupon.type";
import { CouponDiscount } from "./coupon.discount";
import { IdGenerator } from "../gen/id.generator";

export default class Coupon {

  private constructor(
    private _id: CouponId,
    private _couponType: CouponType,
    private _discount: CouponDiscount,
    private _createdAt: Date,
    private _modifiedAt: Date,
    private _deletedAt: Date | null,
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
    createdAt: Date,
    modifiedAt: Date,
    deletedAt: Date | null,
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

  get createdAt(): Date {
    return this._createdAt;
  }

  get modifiedAt(): Date {
    return this._modifiedAt;
  }

  get deletedAt(): Date | null {
    return this._deletedAt;
  }

  get version(): number | null {
    return this._version;
  }
}