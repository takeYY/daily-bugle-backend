import { Test, TestingModule } from '@nestjs/testing';
import { OrdinariesService } from './ordinaries.service';

describe('OrdinariesService', () => {
  let service: OrdinariesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdinariesService],
    }).compile();

    service = module.get<OrdinariesService>(OrdinariesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
