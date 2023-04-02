import * as moment from 'moment-timezone';
import { CouponId } from './coupon.id';
import { UserCoupon } from './user.coupon';
import { UserCouponPeriod } from './user.coupon.period';
import { UserCouponStatus } from './user.coupon.status';
import { UserId } from './user.id';



describe('UserCoupon', () => {

  let ANY_USER_ID: UserId = UserId.of('ANY_USER_ID');
  let ANY_COUPON_ID: CouponId = CouponId.of('ANY_COUPON_ID');
  let ANY_PERIOD: UserCouponPeriod = UserCouponPeriod.of(moment().tz('Asia/Seoul'), moment().tz('Asia/Seoul').add(5, 'day'));

  let sut: UserCoupon;

  beforeEach(() => {
    sut = UserCoupon.create(ANY_USER_ID, ANY_COUPON_ID, ANY_PERIOD);
  });

  describe('use', () => {
    it('이용 가능한 상태에서 쿠폰을 사용 할 수 있다.', () => {
      sut.use();
      expect(sut.status).toEqual(UserCouponStatus.USED);
    });
  
    it('이용 가능한 상태가 아니라면 쿠폰을 사용 할 수 없다.', () => {
      sut.terminate();
      expect(() => sut.use()).toThrowError();
    });
  });

  describe('terminate', () => {
    it('이용 가능한 상태에서 쿠폰을 해지 할 수 있다.', () => {
      sut.terminate();
      expect(sut.status).toEqual(UserCouponStatus.TERMINATED);
    });

    it('이용 가능한 상태가 아니라면 쿠폰을 해지 할 수 없다.', () => {
      sut.use();
      expect(() => sut.terminate()).toThrowError();
    });
  });

  describe('expire', () => {
    it('이용 가능한 상태에서 쿠폰을 만료 할 수 있다.', () => {
      sut.expire();
      expect(sut.status).toEqual(UserCouponStatus.EXPIRED);
    });

    it('이용 가능한 상태가 아니라면 쿠폰을 사용 할 수 없다.', () => {
      sut.terminate();
      expect(() => sut.expire()).toThrowError();
    });
  });
});