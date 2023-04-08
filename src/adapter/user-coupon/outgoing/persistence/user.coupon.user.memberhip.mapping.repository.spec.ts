import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMembershipId } from '../../../../domain/user-coupon/model/user.membership.id';
import { UserCouponEntity } from './user.coupon.entity';
import { UserCouponTestFixture } from './user.coupon.test.fixture';
import { UserCouponUserMembershipMappingRepository } from './user.coupon.user.memberhip.mapping.repository';
import { UserCouponUserMembershipMappingEntity } from './user.coupon.user.membership.mapping.entity';

describe('UserCouponUserMembershipMappingRepository', () => {

  const USER_MEMBERSHIP_ID: UserMembershipId = UserMembershipId.of('USER_MEMBERSHIP_ID');
  const { AVAILABLE_USER_COUPON } = UserCouponTestFixture;

  let userCouponUserMembershipMappingRepository: UserCouponUserMembershipMappingRepository;
  let repository: Repository<UserCouponUserMembershipMappingEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserCouponUserMembershipMappingRepository,
        {
          provide: getRepositoryToken(UserCouponUserMembershipMappingEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    userCouponUserMembershipMappingRepository = module.get<UserCouponUserMembershipMappingRepository>(UserCouponUserMembershipMappingRepository);
    repository = module.get<Repository<UserCouponUserMembershipMappingEntity>>(
      getRepositoryToken(UserCouponUserMembershipMappingEntity),
    );
  });

  describe('save', () => {
    it('유저 쿠폰 유저 멤버십 매핑 등록 테스트', async () => {
      const userCouponUserMembershipMapping = AVAILABLE_USER_COUPON.createUserMembershipMapping(USER_MEMBERSHIP_ID);
      const userCouponUserMembershipMappingEntity = UserCouponUserMembershipMappingEntity.fromDomain(userCouponUserMembershipMapping);

      jest.spyOn(userCouponUserMembershipMappingRepository, 'save').mockResolvedValue(userCouponUserMembershipMappingEntity);

      const actual = await userCouponUserMembershipMappingRepository.save(userCouponUserMembershipMappingEntity);

      expect(actual).toBeInstanceOf(UserCouponUserMembershipMappingEntity);
    });
  });

  describe('findOne', () => {
    it('유저 쿠폰 유저 멤버십 매핑 조회 테스트', async () => {
      const userCouponUserMembershipMapping = AVAILABLE_USER_COUPON.createUserMembershipMapping(USER_MEMBERSHIP_ID);
      const userCouponEntity = UserCouponEntity.fromDomain(AVAILABLE_USER_COUPON);
      const userCouponUserMembershipMappingEntity = UserCouponUserMembershipMappingEntity.fromDomain(userCouponUserMembershipMapping);

      jest.spyOn(userCouponUserMembershipMappingRepository, 'findOne').mockResolvedValue(userCouponUserMembershipMappingEntity);

      const actual = await userCouponUserMembershipMappingRepository.findOne({ 
        relations: ['user_coupon'],
        where: { 
          userCouponEntity: {
            id: userCouponEntity.id
          },
          userMembershipId: userCouponUserMembershipMappingEntity.userMembershipId
        } 
      });
      
      expect(actual).toEqual(userCouponUserMembershipMappingEntity);
      expect(actual.userCouponEntity).toEqual(userCouponEntity);
    });
  });
});

