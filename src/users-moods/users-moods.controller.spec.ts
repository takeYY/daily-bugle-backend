import { Test, TestingModule } from '@nestjs/testing';
import { UsersMoodsController } from './users-moods.controller';
import { UsersMoodsService } from './users-moods.service';

describe('UsersMoodsController', () => {
  let controller: UsersMoodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersMoodsController],
      providers: [UsersMoodsService],
    }).compile();

    controller = module.get<UsersMoodsController>(UsersMoodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
