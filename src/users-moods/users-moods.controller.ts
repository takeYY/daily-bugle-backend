import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersMoodsService } from './users-moods.service';
import { CreateUsersMoodDto } from './dto/create-users-mood.dto';
import { UpdateUsersMoodDto } from './dto/update-users-mood.dto';
import { logger } from 'firebase-functions';

@Controller('users-moods')
export class UsersMoodsController {
  constructor(private readonly usersMoodsService: UsersMoodsService) {}

  @Post()
  create(@Body() createUsersMoodDto: CreateUsersMoodDto) {
    return this.usersMoodsService.create(createUsersMoodDto);
  }

  @Get()
  findAll() {
    logger.info('[usersMoods#findAll] Start');
    return this.usersMoodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersMoodsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsersMoodDto: UpdateUsersMoodDto,
  ) {
    return this.usersMoodsService.update(+id, updateUsersMoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersMoodsService.remove(+id);
  }
}
