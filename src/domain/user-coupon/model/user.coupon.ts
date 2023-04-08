import Coupon from "../../coupon/model/coupon";
import { CouponId } from "../../coupon/model/coupon.id";
import { IdGenerator } from "../../gen/id.generator";
import { UserCouponId } from "./user.coupon.id";
import { UserCouponPeriod } from "./user.coupon.period";
import { UserCouponStatus } from "./user.coupon.status";
import { UserCouponUserMembershipMapping } from "./user.coupon.user.membership.mapping";
import { UserId } from "./user.id";
import { UserMembershipId } from "./user.membership.id";

export class UserCoupon {

  private _id: UserCouponId;
  private _userId: UserId;
  private _coupon: Coupon;
  private _status: UserCouponStatus;
  private _period: UserCouponPeriod;
  private _createdAt: moment.Moment;
  private _modifiedAt: moment.Moment;
  private _version: number;
  
  private constructor(
    id: UserCouponId,
    userId: UserId,
    coupon: Coupon,
    status: UserCouponStatus,
    period: UserCouponPeriod,
    createdAt: moment.Moment | null,
    modifiedAt: moment.Moment | null,
    version: number | null
  ) {
    this._id = id;
    this._userId = userId;
    this._coupon = coupon;
    this._status = status;
    this._period = period;
    this._createdAt = createdAt;
    this._modifiedAt = modifiedAt;
    this._version = version;
  }

  public static create(
    userId: UserId,
    coupon: Coupon,
    period: UserCouponPeriod,
  ): UserCoupon {
    const id: UserCouponId = UserCouponId.of(new IdGenerator().generateRandomId());
    return new UserCoupon(id, userId, coupon, UserCouponStatus.AVAILABLE, period, null, null, null);
  }

  public static of(
    id: UserCouponId,
    userId: UserId,
    coupon: Coupon,
    status: UserCouponStatus,
    period: UserCouponPeriod,
    createdAt: moment.Moment,
    modifiedAt: moment.Moment,
    version: number
  ): UserCoupon {
    return new UserCoupon(id, userId, coupon, status, period, createdAt, modifiedAt, version);
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

  private _useCouponUserMembershipMapping: UserCouponUserMembershipMapping;

  public createUserMembershipMapping(userMembershipId: UserMembershipId): UserCouponUserMembershipMapping {
    this._useCouponUserMembershipMapping = UserCouponUserMembershipMapping.create(this, userMembershipId);
    return this._useCouponUserMembershipMapping;
  }

  get id(): UserCouponId {
    return this._id;
  }
  
  get userId(): UserId {
    return this._userId;
  }
  
  get coupon(): Coupon {
    return this._coupon;
  }
  
  get status(): UserCouponStatus {
    return this._status;
  }
  
  get period(): UserCouponPeriod {
    return this._period;
  }
  
  get createdAt(): moment.Moment {
    return this._createdAt;
  }
  
  get modifiedAt(): moment.Moment {
    return this._modifiedAt;
  }
  
  get version(): number {
    return this._version;
  }
}