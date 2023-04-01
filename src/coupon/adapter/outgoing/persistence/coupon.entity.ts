import Coupon from "src/coupon/domain/model/Coupon";
import { CouponId } from "src/coupon/domain/model/coupon.id";
import { CouponType } from "src/coupon/domain/model/coupon.type";
import { CouponDiscount } from "src/coupon/domain/model/coupon.discount";
import { CouponDiscountType } from "src/coupon/domain/model/coupon.discount.type";
import { CouponDiscountValue } from "src/coupon/domain/model/coupon.discount.value";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

@Entity('coupon')
export class CouponEntity {
  
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ name: 'coupon_type', nullable: false })
  couponType: CouponType;
  @Column({ name: 'discount_type', nullable: false })
  discountType: CouponDiscountType;
  @Column({ name: 'discount_value', nullable: false })
  discountValue: number;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp' })
  modifiedAt: Date;
  deletedAt: Date;
  @VersionColumn()
  version: number;
 
  private constructor(
    id: string,
    couponType: CouponType,
    discountType: CouponDiscountType,
    discountValue: number,
    createdAt: Date,
    modifiedAt: Date,
    deletedAt: Date,
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
      coupon.createdAt,
      coupon.modifiedAt,
      coupon.modifiedAt,
      coupon.version
    );
  }

  public toDomian(): Coupon {
    return Coupon.of(
      CouponId.of(this.id),
      this.couponType,
      CouponDiscount.of(this.discountType, CouponDiscountValue.of(this.discountValue)),
      this.createdAt,
      this.modifiedAt,
      this.deletedAt,
      this.version
    );
  }
}