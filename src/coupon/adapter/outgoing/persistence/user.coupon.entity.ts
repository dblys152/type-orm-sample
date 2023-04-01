import { CouponId } from "src/coupon/domain/model/coupon.id";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { UserCoupon } from "src/coupon/domain/model/user.coupon";
import { UserCouponPeriod } from "src/coupon/domain/model/user.coupon.period";
import { UserCouponId } from "src/coupon/domain/model/user.coupon.id";
import { UserId } from "src/coupon/domain/model/user.id";
import { UserCouponStatus } from "src/coupon/domain/model/user.coupon.status";

@Entity('user_coupon')
export class UserCouponEntity {
  
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ name: 'user_id', nullable: false })
  userId: string;
  @Column({ name: 'coupon_id', nullable: false })
  couponId: string;
  @Column({ name: 'status', nullable: false })
  status: UserCouponStatus;
  @Column({ name: 'started_at', nullable: false })
  startedAt: Date;
  @Column({ name: 'ended_at', nullable: false })
  endedAt: Date;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;
  @VersionColumn()
  version: number;
 
  private constructor(
    id: string,
    userId: string,
    couponId: string,
    status: UserCouponStatus,
    startedAt: Date,
    endedAt: Date,
    createdAt: Date,
    modifiedAt: Date,
    version: number,
  ) {
    this.id = id;
    this.userId = userId;
    this.couponId = couponId;
    this.status = status;
    this.startedAt = startedAt;
    this.endedAt = endedAt;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
    this.version = version;
  }

  public static fromDomain(userCoupon: UserCoupon): UserCouponEntity {
    const period: UserCouponPeriod = userCoupon.period;
    return new UserCouponEntity(
      userCoupon.id.value,
      userCoupon.userId.value,
      userCoupon.couponId.value,
      userCoupon.status,
      period.startedAt,
      period.endedAt,
      userCoupon.createdAt,
      userCoupon.modifiedAt,
      userCoupon.version
    );
  }

  public toDomian(): UserCoupon {
    return UserCoupon.of(
      UserCouponId.of(this.id),
      UserId.of(this.userId),
      CouponId.of(this.id),
      this.status,
      UserCouponPeriod.of(this.startedAt, this.endedAt),
      this.createdAt,
      this.modifiedAt,
      this.version
    );
  }
}