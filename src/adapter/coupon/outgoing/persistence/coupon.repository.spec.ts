import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Coupon from '../../../../domain/coupon/model/coupon';
import { CouponType } from '../../../../domain/coupon/model/coupon.type';
import { CouponEntity } from './coupon.entity';
import { CouponRepository } from './coupon.repository';
import couponTestFixture from './coupon.test.fixture';

describe('CouponRepository', () => {
  let couponRepository: CouponRepository;
  let repository: Repository<CouponEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CouponRepository,
        {
          provide: getRepositoryToken(CouponEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    couponRepository = module.get<CouponRepository>(CouponRepository);
    repository = module.get<Repository<CouponEntity>>(
      getRepositoryToken(CouponEntity),
    );
  });

  describe('save', () => {
    it('쿠폰 등록 테스트', async () => {
      const coupon = Coupon.create(CouponType.PODUCT_DISCOUNT, couponTestFixture.PERCENTAGE_DISCOUNT);
      const couponEntity = CouponEntity.fromDomain(coupon);

      jest.spyOn(couponRepository, 'save').mockResolvedValue(couponEntity);

      const actual = await couponRepository.save(couponEntity);

      expect(actual).toBeInstanceOf(CouponEntity);
    });
  });

  describe('findOne', () => {
    it('쿠폰 조회 테스트', async () => {
      const coupon = couponTestFixture.COUPON;
      const couponEntity = CouponEntity.fromDomain(coupon);

      jest.spyOn(couponRepository, 'findOne').mockResolvedValue(couponEntity);

      const actual = await couponRepository.findOne({ where: {id: couponEntity.id} });
      
      expect(actual).toEqual(couponEntity);
    });
  });
});

