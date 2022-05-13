import { Test, TestingModule } from '@nestjs/testing';
import { UsersOrdinariesController } from './users-ordinaries.controller';
import { UsersOrdinariesService } from './users-ordinaries.service';

describe('UsersOrdinariesController', () => {
  let controller: UsersOrdinariesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersOrdinariesController],
      providers: [UsersOrdinariesService],
    }).compile();

    controller = module.get<UsersOrdinariesController>(UsersOrdinariesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
