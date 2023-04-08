import { IdGenerator } from "../../gen/id.generator";
import { UserCoupon } from "./user.coupon";
import { UserMembershipId } from "./user.membership.id";

export class UserCouponUserMembershipMapping {

  private constructor(
    private _id: string,
    private _userCoupon: UserCoupon,
    private _userMembershipId: UserMembershipId,
    private _createdAt: moment.Moment | null,
    private _version: number | null
  ) {}

  public static create(userCoupon: UserCoupon, userMembershipId: UserMembershipId): UserCouponUserMembershipMapping {
    const id: string = new IdGenerator().generateRandomId();
    return new UserCouponUserMembershipMapping(id, userCoupon, userMembershipId, null, null);
  }

  public static of(
    id: string,
    userCoupon: UserCoupon,
    userMembershipId: UserMembershipId,
    createdAt: moment.Moment,
    version: number
  ): UserCouponUserMembershipMapping {
    return new UserCouponUserMembershipMapping(id, userCoupon, userMembershipId, createdAt, version);
  }

  get id(): string {
    return this._id;
  }

  get userCoupon(): UserCoupon {
    return this._userCoupon;
  }

  get userMembershipId(): UserMembershipId {
    return this._userMembershipId;
  }

  get createdAt(): moment.Moment | null {
    return this._createdAt;
  }

  get version(): number | null {
    return this._version;
  }
}