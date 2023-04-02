import * as moment from "moment-timezone";
import { UserCouponPeriod } from "./user.coupon.period";

describe('UserCouponPeriod', () => {

  const NOW = moment().tz('Asia/Seoul');
  
  describe('of', () => {
    it('유저 쿠폰 기간을 생성한다.', () => {
      const startedAt = NOW;
      const endedAt = moment(NOW).add(5, 'day');
      const actual = UserCouponPeriod.of(startedAt, endedAt);

      expect(actual).toBeInstanceOf(UserCouponPeriod);
      expect(actual.startedAt).toEqual(startedAt);
      expect(actual.endedAt).toEqual(endedAt);
    });

    it('시작일시가 종료일시보다 이후 일 수 없다.', () => {
      const startedAt = NOW;
      const endedAt = moment(NOW).add(-5, 'day');

      expect(() => UserCouponPeriod.of(startedAt, endedAt)).toThrowError();
    });
  });
});
