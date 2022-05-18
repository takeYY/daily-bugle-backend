import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TestMessageService } from './test-message.service';
import { CreateTestMessageDto } from './dto/create-test-message.dto';
import { UpdateTestMessageDto } from './dto/update-test-message.dto';

@Controller('test-message')
export class TestMessageController {
  constructor(private readonly testMessageService: TestMessageService) {}

  @Post('query')
  testM(@Body() test: any) {
    return this.testMessageService.testM(test.name);
  }

  @Post()
  create(@Body() createTestMessageDto: CreateTestMessageDto) {
    return this.testMessageService.create(createTestMessageDto);
  }

  @Get()
  findAll() {
    return this.testMessageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testMessageService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestMessageDto: UpdateTestMessageDto,
  ) {
    return this.testMessageService.update(+id, updateTestMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testMessageService.remove(+id);
  }
}
