import * as moment from "moment-timezone";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, VersionColumn } from "typeorm";
import { UserCouponUserMembershipMapping } from "../../../../domain/user-coupon/model/user.coupon.user.membership.mapping";
import { UserMembershipId } from "../../../../domain/user-coupon/model/user.membership.id";
import { UserCouponEntity } from "./user.coupon.entity";


@Entity('user_coupon_user_membership_mapping')
export class UserCouponUserMembershipMappingEntity {

  private static readonly DATETIME_FORMAT: string = 'YYYY-MM-DD HH:mm:ss';
  
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => UserCouponEntity)
  @JoinColumn({ name: 'user_coupon_id' })
  userCouponEntity: UserCouponEntity;

  @Column({ name: 'user_membership_id', nullable: false })
  userMembershipId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;
  @VersionColumn()
  version: number;
 
  private constructor(
    id: string,
    userCouponEntity: UserCouponEntity,
    userMembershipId: string,
    createdAt: string,
    version: number,
  ) {
    this.id = id;
    this.userCouponEntity = userCouponEntity;
    this.userMembershipId = userMembershipId;
    this.createdAt = createdAt;
    this.version = version;
  }

  public static fromDomain(userCouponUserMembershipMapping: UserCouponUserMembershipMapping): UserCouponUserMembershipMappingEntity {
    return new UserCouponUserMembershipMappingEntity(
      userCouponUserMembershipMapping.id,
      UserCouponEntity.fromDomain(userCouponUserMembershipMapping.userCoupon),
      userCouponUserMembershipMapping.userMembershipId.value,
      userCouponUserMembershipMapping.createdAt ? userCouponUserMembershipMapping.createdAt.format(this.DATETIME_FORMAT) : null,
      userCouponUserMembershipMapping.version
    );
  }

  public toDomian(): UserCouponUserMembershipMapping {
    return UserCouponUserMembershipMapping.of(
      this.id,
      this.userCouponEntity.toDomian(),
      UserMembershipId.of(this.userMembershipId),
      moment(this.createdAt).tz('Asia/Seoul'),
      this.version
    );
  }
}