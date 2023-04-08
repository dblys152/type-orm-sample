import { Repository } from 'typeorm';
import { CustomRepository } from '../../../config/typeorm.custom.decorator';
import { UserCouponUserMembershipMappingEntity } from './user.coupon.user.membership.mapping.entity';


@CustomRepository(UserCouponUserMembershipMappingEntity)
export class UserCouponUserMembershipMappingRepository extends Repository<UserCouponUserMembershipMappingEntity> {

}