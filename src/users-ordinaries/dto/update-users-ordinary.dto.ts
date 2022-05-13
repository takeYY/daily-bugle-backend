import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersOrdinaryDto } from './create-users-ordinary.dto';

export class UpdateUsersOrdinaryDto extends PartialType(CreateUsersOrdinaryDto) {}
