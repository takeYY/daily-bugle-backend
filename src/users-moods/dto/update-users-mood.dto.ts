import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersMoodDto } from './create-users-mood.dto';

export class UpdateUsersMoodDto extends PartialType(CreateUsersMoodDto) {}
