import { Test, TestingModule } from '@nestjs/testing';
import { WeekdaysController } from './weekdays.controller';
import { WeekdaysService } from './weekdays.service';

describe('WeekdaysController', () => {
  let controller: WeekdaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeekdaysController],
      providers: [WeekdaysService],
    }).compile();

    controller = module.get<WeekdaysController>(WeekdaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
