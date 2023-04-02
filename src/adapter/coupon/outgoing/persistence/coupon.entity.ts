import * as moment from "moment-timezone";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";
import Coupon from "../../../../domain/coupon/model/coupon";
import { CouponDiscount } from "../../../../domain/coupon/model/coupon.discount";
import { CouponDiscountType } from "../../../../domain/coupon/model/coupon.discount.type";
import { CouponDiscountValue } from "../../../../domain/coupon/model/coupon.discount.value";
import { CouponId } from "../../../../domain/coupon/model/coupon.id";
import { CouponType } from "../../../../domain/coupon/model/coupon.type";

@Entity('coupon')
export class CouponEntity {

  private static readonly DATETIME_FORMAT: string = 'YYYY-MM-DD HH:mm:ss';
  
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ name: 'coupon_type', nullable: false })
  couponType: CouponType;
  @Column({ name: 'discount_type', nullable: false })
  discountType: CouponDiscountType;
  @Column({ name: 'discount_value', nullable: false })
  discountValue: number;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;
  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: string;
  @Column({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: string;
  @VersionColumn()
  version: number;
 
  private constructor(
    id: string,
    couponType: CouponType,
    discountType: CouponDiscountType,
    discountValue: number,
    createdAt: string,
    modifiedAt: string,
    deletedAt: string,
    version: number
  ) {
    this.id = id;
    this.couponType = couponType;
    this.discountType = discountType;
    this.discountValue = discountValue;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
    this.deletedAt = deletedAt;
    this.version = version;
  }

  public static fromDomain(coupon: Coupon): CouponEntity {
    const discount: CouponDiscount = coupon.discount;
    return new CouponEntity(
      coupon.id.value,
      coupon.couponType,
      discount.discountType,
      discount.discountValue.value,
      coupon.createdAt ? coupon.createdAt.format(this.DATETIME_FORMAT) : null,
      coupon.modifiedAt ? coupon.modifiedAt.format(this.DATETIME_FORMAT) : null,
      coupon.deletedAt ? coupon.deletedAt.format(this.DATETIME_FORMAT) : null,
      coupon.version
    );
  }

  public toDomian(): Coupon {
    return Coupon.of(
      CouponId.of(this.id),
      this.couponType,
      CouponDiscount.of(this.discountType, CouponDiscountValue.of(this.discountValue)),
      moment(this.createdAt).tz('Asia/Seoul'),
      moment(this.modifiedAt).tz('Asia/Seoul'),
      moment(this.deletedAt).tz('Asia/Seoul'),
      this.version
    );
  }
}