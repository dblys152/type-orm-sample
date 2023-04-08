
import { Injectable } from "@nestjs/common";
import { UserCoupon } from "../../../domain/user-coupon/model/user.coupon";
import { UserCouponId } from "../../../domain/user-coupon/model/user.coupon.id";
import { LoadUserCouponPort } from "../../../domain/user-coupon/port/load.user.coupon.port";
import { RecordUserCouponPort } from "../../../domain/user-coupon/port/record.user.coupon.port";
import { UserCouponEntity } from "./persistence/user.coupon.entity";
import { UserCouponRepository } from "./persistence/user.coupon.repository";
import { UserCouponRepositorySupport } from "./persistence/user.coupon.repository.support";

@Injectable()
export class UserCouponPersistenceAdapter implements RecordUserCouponPort, LoadUserCouponPort {

  constructor(
    private readonly userCouponRepository: UserCouponRepository,
    private readonly userCouponRepositorySupport: UserCouponRepositorySupport,
  ) {}

  public async save(userCoupon: UserCoupon): Promise<UserCoupon> {
    const userCouponEntity = await this.userCouponRepository.save(UserCouponEntity.fromDomain(userCoupon));
    return userCouponEntity.toDomian();
  }

  public async findById(id: UserCouponId): Promise<UserCoupon> {
    const couponEntity = await this.userCouponRepositorySupport.findById(id.value);
    return couponEntity.toDomian();
  }
}