import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdinaryDto } from './create-ordinary.dto';

export class UpdateOrdinaryDto extends PartialType(CreateOrdinaryDto) {}
