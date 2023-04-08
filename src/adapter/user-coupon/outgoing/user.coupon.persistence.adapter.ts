
import { Injectable } from "@nestjs/common";
import { UserCoupon } from "../../../domain/user-coupon/model/user.coupon";
import { UserCouponId } from "../../../domain/user-coupon/model/user.coupon.id";
import { LoadUserCouponPort } from "../../../domain/user-coupon/port/load.user.coupon.port";
import { RecordUserCouponPort } from "../../../domain/user-coupon/port/record.user.coupon.port";
import { UserCouponRepository } from "./persistence/user.coupon.repository";

@Injectable()
export class UserCouponPersistenceAdapter implements RecordUserCouponPort, LoadUserCouponPort {

  constructor(
    private readonly userCouponRepository: UserCouponRepository,
  ) {}

  save(coupon: UserCoupon): Promise<UserCoupon> {
    throw new Error("Method not implemented.");
  }

  findById(id: UserCouponId): Promise<UserCoupon> {
    throw new Error("Method not implemented.");
  }

  // public async findById(id: CouponId): Promise<Coupon> {
  //   const couponEntity = await this.couponRepository.findOne({
  //     where: {id: id.value}
  //   });
  //   return couponEntity.toDomian();
  // }

  // public async save(coupon: Coupon): Promise<Coupon> {
  //   const couponEntity = await this.couponRepository.save(CouponEntity.fromDomain(coupon));
  //   return couponEntity.toDomian();
  // }
}