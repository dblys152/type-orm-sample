import { UserCoupon } from './user.coupon';
import { UserCouponStatus } from './user.coupon.status';
import { UserCouponTestFixture } from './user.coupon.test.fixture';

describe('UserCoupon', () => {

  const {USER_ID, COUPON, USER_COUPON_PERIOD} = UserCouponTestFixture;

  let sut: UserCoupon;

  beforeEach(() => {
    sut = UserCoupon.create(USER_ID, COUPON, USER_COUPON_PERIOD);
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