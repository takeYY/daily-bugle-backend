import { Test, TestingModule } from '@nestjs/testing';
import { UsersMoodsService } from './users-moods.service';

describe('UsersMoodsService', () => {
  let service: UsersMoodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersMoodsService],
    }).compile();

    service = module.get<UsersMoodsService>(UsersMoodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
