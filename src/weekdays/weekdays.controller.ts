import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeekdaysService } from './weekdays.service';
import { CreateWeekdayDto } from './dto/create-weekday.dto';
import { UpdateWeekdayDto } from './dto/update-weekday.dto';

@Controller('weekdays')
export class WeekdaysController {
  constructor(private readonly weekdaysService: WeekdaysService) {}

  @Post()
  create(@Body() createWeekdayDto: CreateWeekdayDto) {
    return this.weekdaysService.create(createWeekdayDto);
  }

  @Get()
  findAll() {
    return this.weekdaysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weekdaysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeekdayDto: UpdateWeekdayDto) {
    return this.weekdaysService.update(+id, updateWeekdayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weekdaysService.remove(+id);
  }
}
