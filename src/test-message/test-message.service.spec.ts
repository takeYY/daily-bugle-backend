import { Test, TestingModule } from '@nestjs/testing';
import { TestMessageService } from './test-message.service';

describe('TestMessageService', () => {
  let service: TestMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestMessageService],
    }).compile();

    service = module.get<TestMessageService>(TestMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
