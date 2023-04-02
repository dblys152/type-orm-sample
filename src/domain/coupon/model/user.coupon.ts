import { IdGenerator } from "../../gen/id.generator";
import { CouponId } from "./coupon.id";
import { UserCouponId } from "./user.coupon.id";
import { UserCouponPeriod } from "./user.coupon.period";
import { UserCouponStatus } from "./user.coupon.status";
import { UserId } from "./user.id";

export class UserCoupon {

  private _id: UserCouponId;
  private _userId: UserId;
  private _couponId: CouponId;
  private _status: UserCouponStatus;
  private _period: UserCouponPeriod;
  private _createdAt: string;
  private _modifiedAt: string;
  private _version: number;
  
  private constructor(
    id: UserCouponId,
    userId: UserId,
    couponId: CouponId,
    status: UserCouponStatus,
    period: UserCouponPeriod,
    createdAt: string | null,
    modifiedAt: string | null,
    version: number | null
  ) {
    this._id = id;
    this._userId = userId;
    this._couponId = couponId;
    this._status = status;
    this._period = period;
    this._createdAt = createdAt;
    this._modifiedAt = modifiedAt;
    this._version = version;
  }

  public static create(
    userId: UserId,
    couponId: CouponId,
    period: UserCouponPeriod,
  ): UserCoupon {
    const id: UserCouponId = UserCouponId.of(new IdGenerator().generateRandomId());
    return new UserCoupon(id, userId, couponId, UserCouponStatus.AVAILABLE, period, null, null, null);
  }

  public static of(
    id: UserCouponId,
    userId: UserId,
    couponId: CouponId,
    status: UserCouponStatus,
    period: UserCouponPeriod,
    createdAt: string | null,
    modifiedAt: string | null,
    version: number | null
  ): UserCoupon {
    return new UserCoupon(id, userId, couponId, status, period, createdAt, modifiedAt, version);
  }

  public use() {
    if (!this.isAvailable()) {
      throw new Error('AVAILABLE 상태에서만 사용 가능합니다.');
    }
    this._status = UserCouponStatus.USED;
  }

  public terminate() {
    if (!this.isAvailable()) {
      throw new Error('AVAILABLE 상태에서만 해지 가능합니다.');
    }
    this._status = UserCouponStatus.TERMINATED;
  }

  public expire() {
    if (!this.isAvailable()) {
      throw new Error('AVAILABLE 상태에서만 만료 가능합니다.');
    }
    this._status = UserCouponStatus.EXPIRED;
  }

  public isAvailable(): boolean {
    return this._status === UserCouponStatus.AVAILABLE;
  }

  get id(): UserCouponId {
    return this._id;
  }
  
  get userId(): UserId {
    return this._userId;
  }
  
  get couponId(): CouponId {
    return this._couponId;
  }
  
  get status(): UserCouponStatus {
    return this._status;
  }
  
  get period(): UserCouponPeriod {
    return this._period;
  }
  
  get createdAt(): string {
    return this._createdAt;
  }
  
  get modifiedAt(): string {
    return this._modifiedAt;
  }
  
  get version(): number {
    return this._version;
  }
}