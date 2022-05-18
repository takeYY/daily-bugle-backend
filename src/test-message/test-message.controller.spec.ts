import { Test, TestingModule } from '@nestjs/testing';
import { TestMessageController } from './test-message.controller';
import { TestMessageService } from './test-message.service';

describe('TestMessageController', () => {
  let controller: TestMessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestMessageController],
      providers: [TestMessageService],
    }).compile();

    controller = module.get<TestMessageController>(TestMessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
