import { Repository } from 'typeorm';
import { CustomRepository } from '../../../config/typeorm.custom.decorator';
import { UserCouponEntity } from './user.coupon.entity';


@CustomRepository(UserCouponEntity)
export class UserCouponRepository extends Repository<UserCouponEntity> {

}