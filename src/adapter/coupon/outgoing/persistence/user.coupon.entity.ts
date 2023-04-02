import * as moment from "moment-timezone";
import { CouponId } from "src/domain/coupon/model/coupon.id";
import { UserCoupon } from "src/domain/coupon/model/user.coupon";
import { UserCouponId } from "src/domain/coupon/model/user.coupon.id";
import { UserCouponPeriod } from "src/domain/coupon/model/user.coupon.period";
import { UserCouponStatus } from "src/domain/coupon/model/user.coupon.status";
import { UserId } from "src/domain/coupon/model/user.id";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";


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
  startedAt: string;
  @Column({ name: 'ended_at', nullable: false })
  endedAt: string;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;
  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: string;
  @VersionColumn()
  version: number;
 
  private constructor(
    id: string,
    userId: string,
    couponId: string,
    status: UserCouponStatus,
    startedAt: string,
    endedAt: string,
    createdAt: string,
    modifiedAt: string,
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
      period.startedAt.format('YYYY-MM-DD HH:mm:ss'),
      period.endedAt.format('YYYY-MM-DD HH:mm:ss'),
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
      UserCouponPeriod.of(moment(this.startedAt).tz('Asia/Seoul'), moment(this.endedAt).tz('Asia/Seoul')),
      this.createdAt,
      this.modifiedAt,
      this.version
    );
  }
}