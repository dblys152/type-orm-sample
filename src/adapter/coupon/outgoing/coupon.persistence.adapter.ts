
import { Injectable } from "@nestjs/common";
import Coupon from "../../../domain/coupon/model/coupon";
import { CouponId } from "../../../domain/coupon/model/coupon.id";
import { LoadCouponPort } from "../../../domain/coupon/ports/load.coupon.port";
import { RecordCouponPort } from "../../../domain/coupon/ports/record.coupon.port";
import { CouponEntity } from "./persistence/coupon.entity";
import { CouponRepository } from "./persistence/coupon.repository";

@Injectable()
export class CouponPersistenceAdapter implements RecordCouponPort, LoadCouponPort {

  constructor(
    private readonly couponRepository: CouponRepository,
  ) {}

  public async findById(id: CouponId): Promise<Coupon> {
    const couponEntity = await this.couponRepository.findOne({
      where: {id: id.value}
    });
    return couponEntity.toDomian();
  }

  public async save(coupon: Coupon): Promise<Coupon> {
    const couponEntity = await this.couponRepository.save(CouponEntity.fromDomain(coupon));
    return couponEntity.toDomian();
  }
}