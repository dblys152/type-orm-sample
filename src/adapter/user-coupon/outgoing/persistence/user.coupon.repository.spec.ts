import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCoupon } from '../../../../domain/user-coupon/model/user.coupon';
import { UserCouponEntity } from './user.coupon.entity';
import { UserCouponRepository } from './user.coupon.repository';
import { UserCouponTestFixture } from './user.coupon.test.fixture';

describe('UserCouponRepository', () => {
  let userCouponRepository: UserCouponRepository;
  let repository: Repository<UserCouponEntity>;

  const { COUPON, USER_ID, USER_COUPON_PERIOD, AVAILABLE_USER_COUPON } = UserCouponTestFixture;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserCouponRepository,
        {
          provide: getRepositoryToken(UserCouponEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    userCouponRepository = module.get<UserCouponRepository>(UserCouponRepository);
    repository = module.get<Repository<UserCouponEntity>>(
      getRepositoryToken(UserCouponEntity),
    );
  });

  describe('save', () => {
    it('유저 쿠폰 등록 테스트', async () => {
      const coupon = COUPON;
      const userCoupon = UserCoupon.create(USER_ID, coupon, USER_COUPON_PERIOD);
      const userCouponEntity = UserCouponEntity.fromDomain(userCoupon);

      jest.spyOn(userCouponRepository, 'save').mockResolvedValue(userCouponEntity);

      const actual = await userCouponRepository.save(userCouponEntity);

      expect(actual).toBeInstanceOf(UserCouponEntity);
    });
  });

  describe('findOne', () => {
    it('유저 쿠폰 조회 테스트', async () => {
      const userCoupon = AVAILABLE_USER_COUPON;
      const userCouponEntity = UserCouponEntity.fromDomain(userCoupon);

      jest.spyOn(userCouponRepository, 'findOne').mockResolvedValue(userCouponEntity);

      const actual = await userCouponRepository.findOne({ 
        relations:['coupon'],
        where: {id: userCouponEntity.id} 
      });
      
      expect(actual).toEqual(userCouponEntity);
    });
  });
});