import { Test, TestingModule } from '@nestjs/testing';
import { UsersOrdinariesService } from './users-ordinaries.service';

describe('UsersOrdinariesService', () => {
  let service: UsersOrdinariesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersOrdinariesService],
    }).compile();

    service = module.get<UsersOrdinariesService>(UsersOrdinariesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
