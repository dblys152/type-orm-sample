import { CouponDiscount } from "./coupon.discount";
import { CouponDiscountType } from "./coupon.discount.type";
import { CouponDiscountValue } from "./coupon.discount.value";


describe('CouponDiscount', () => {
  let sut: CouponDiscount;

  describe('getDiscountedAmount', () => {
    it('50% 할인 적용.', () => {
      const productPrice: number = 350000;
      sut = CouponDiscount.of(
        CouponDiscountType.PERCENTAGE,
        CouponDiscountValue.of(50)
      );

      const actual = sut.getDiscountedAmount(productPrice);

      expect(actual).toEqual(175000);
    });

    it('100% 할인 적용.', () => {
      const productPrice: number = 350000;
      sut = CouponDiscount.of(
        CouponDiscountType.PERCENTAGE,
        CouponDiscountValue.of(100)
      );
  
      const actual = sut.getDiscountedAmount(productPrice);
  
      expect(actual).toEqual(0);
    });
  
    it('70000원 할인 적용.', () => {
      const productPrice: number = 350000;
      sut = CouponDiscount.of(
        CouponDiscountType.AMOUNT,
        CouponDiscountValue.of(70000)
      );
  
      const actual = sut.getDiscountedAmount(productPrice);
  
      expect(actual).toEqual(280000);
    });
  
    it('할인 적용된 최소 금액은 0원이다.', () => {
      const productPrice: number = 70000;
      sut = CouponDiscount.of(
        CouponDiscountType.AMOUNT,
        CouponDiscountValue.of(100000)
      );
  
      const actual = sut.getDiscountedAmount(productPrice);
  
      expect(actual).toEqual(0);
    });
  });
});
