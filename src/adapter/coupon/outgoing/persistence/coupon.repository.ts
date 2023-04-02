import { Repository } from 'typeorm';
import { CustomRepository } from '../config/typeorm.custom.decorator';
import { CouponEntity } from './coupon.entity';


@CustomRepository(CouponEntity)
export class CouponRepository extends Repository<CouponEntity> {

}