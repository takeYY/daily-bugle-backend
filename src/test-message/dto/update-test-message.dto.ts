import { PartialType } from '@nestjs/mapped-types';
import { CreateTestMessageDto } from './create-test-message.dto';

export class UpdateTestMessageDto extends PartialType(CreateTestMessageDto) {}
