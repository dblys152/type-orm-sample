import { Test, TestingModule } from '@nestjs/testing';
import { UserCouponEntity } from './user.coupon.entity';
import { UserCouponRepository } from "./user.coupon.repository";
import { UserCouponRepositorySupport } from './user.coupon.repository.support';
import { UserCouponTestFixture } from './user.coupon.test.fixture';

class UserCouponRepositoryMock {}

describe('UserCouponRepositorySupport', () => {

  const { COUPON, USER_ID, USER_COUPON_PERIOD, AVAILABLE_USER_COUPON } = UserCouponTestFixture;

  let sut: UserCouponRepositorySupport;
  let userCouponRepository: UserCouponRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCouponRepositorySupport],
      providers: [
        {
          provide: UserCouponRepository,
          useClass: UserCouponRepositoryMock,
        },
      ],
    }).compile();

    sut = module.get(UserCouponRepositorySupport);
    userCouponRepository = module.get(UserCouponRepository);
  });

  describe('findById', () => {
    it('유저 쿠폰 조회 테스트', async () => {
      const userCoupon = AVAILABLE_USER_COUPON;
      const userCouponEntity = UserCouponEntity.fromDomain(userCoupon);

      jest.spyOn(sut, 'findById').mockResolvedValue(userCouponEntity);

      const actual = await sut.findById(userCouponEntity.id);
      expect(actual).toEqual(userCouponEntity);
    });
  });
});