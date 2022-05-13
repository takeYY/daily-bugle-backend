import { Module } from '@nestjs/common';
import { WeekdaysService } from './weekdays.service';
import { WeekdaysController } from './weekdays.controller';

@Module({
  controllers: [WeekdaysController],
  providers: [WeekdaysService],
})
export class WeekdaysModule {}
