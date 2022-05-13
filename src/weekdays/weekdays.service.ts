import { Injectable } from '@nestjs/common';
import { CreateWeekdayDto } from './dto/create-weekday.dto';
import { UpdateWeekdayDto } from './dto/update-weekday.dto';

@Injectable()
export class WeekdaysService {
  create(createWeekdayDto: CreateWeekdayDto) {
    return 'This action adds a new weekday';
  }

  findAll() {
    return `This action returns all weekdays`;
  }

  findOne(id: number) {
    return `This action returns a #${id} weekday`;
  }

  update(id: number, updateWeekdayDto: UpdateWeekdayDto) {
    return `This action updates a #${id} weekday`;
  }

  remove(id: number) {
    return `This action removes a #${id} weekday`;
  }
}
