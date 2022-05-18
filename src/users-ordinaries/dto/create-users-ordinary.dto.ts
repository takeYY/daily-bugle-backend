import { CreateOrdinaryDto } from 'src/ordinaries/dto/create-ordinary.dto';
import { CreateWeekdayDto } from 'src/weekdays/dto/create-weekday.dto';

export class CreateUsersOrdinaryDto {
  id?: string;
  userId: string;
  ordinary: CreateOrdinaryDto;
  weekdays: CreateWeekdayDto[];
  startedOn: Date;
  createdAt: Date;
  updatedAt: Date;
  isClosed: boolean;
}
