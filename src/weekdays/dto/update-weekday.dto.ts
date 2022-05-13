import { PartialType } from '@nestjs/mapped-types';
import { CreateWeekdayDto } from './create-weekday.dto';

export class UpdateWeekdayDto extends PartialType(CreateWeekdayDto) {}
