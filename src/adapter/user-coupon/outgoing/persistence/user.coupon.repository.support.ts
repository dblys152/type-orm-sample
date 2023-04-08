import { Injectable } from "@nestjs/common";
import { UserCouponEntity } from "./user.coupon.entity";
import { UserCouponRepository } from "./user.coupon.repository";

@Injectable()
export class UserCouponRepositorySupport {

  constructor(
    private userCouponRepository: UserCouponRepository
  ) {}

  public async findById(id: string) {
    return await this.userCouponRepository.createQueryBuilder('user_coupon')
      .where('1 = 1')
      .andWhere('id = :id', { id })
      .getOne();
  }
}