import { Test, TestingModule } from '@nestjs/testing';
import { OrdinariesController } from './ordinaries.controller';
import { OrdinariesService } from './ordinaries.service';

describe('OrdinariesController', () => {
  let controller: OrdinariesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdinariesController],
      providers: [OrdinariesService],
    }).compile();

    controller = module.get<OrdinariesController>(OrdinariesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
