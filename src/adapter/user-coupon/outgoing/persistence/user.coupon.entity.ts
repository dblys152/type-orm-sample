import * as moment from "moment-timezone";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import { UserCoupon } from "../../../../domain/user-coupon/model/user.coupon";
import { UserCouponId } from "../../../../domain/user-coupon/model/user.coupon.id";
import { UserCouponPeriod } from "../../../../domain/user-coupon/model/user.coupon.period";
import { UserCouponStatus } from "../../../../domain/user-coupon/model/user.coupon.status";
import { UserId } from "../../../../domain/user-coupon/model/user.id";
import { CouponEntity } from "../../../coupon/outgoing/persistence/coupon.entity";


@Entity('user_coupon')
export class UserCouponEntity {

  private static readonly DATETIME_FORMAT: string = 'YYYY-MM-DD HH:mm:ss';
  
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ name: 'user_id', nullable: false })
  userId: string;

  @ManyToOne(() => CouponEntity)
  @JoinColumn({ name: 'coupon_id' })
  couponEntity: CouponEntity;

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
    couponEntity: CouponEntity,
    status: UserCouponStatus,
    startedAt: string,
    endedAt: string,
    createdAt: string,
    modifiedAt: string,
    version: number,
  ) {
    this.id = id;
    this.userId = userId;
    this.couponEntity = couponEntity;
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
      CouponEntity.fromDomain(userCoupon.coupon),
      userCoupon.status,
      period.startedAt.format(this.DATETIME_FORMAT),
      period.endedAt.format(this.DATETIME_FORMAT),
      userCoupon.createdAt ? userCoupon.createdAt.format(this.DATETIME_FORMAT) : null,
      userCoupon.modifiedAt ? userCoupon.modifiedAt.format(this.DATETIME_FORMAT) : null,
      userCoupon.version
    );
  }

  public toDomian(): UserCoupon {
    return UserCoupon.of(
      UserCouponId.of(this.id),
      UserId.of(this.userId),
      this.couponEntity.toDomian(),
      this.status,
      UserCouponPeriod.of(moment(this.startedAt).tz('Asia/Seoul'), moment(this.endedAt).tz('Asia/Seoul')),
      moment(this.createdAt).tz('Asia/Seoul'),
      moment(this.modifiedAt).tz('Asia/Seoul'),
      this.version
    );
  }
}