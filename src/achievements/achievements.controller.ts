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
import { logger } from 'firebase-functions/v1';
import { AchievementsService } from './achievements.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';

@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Post()
  create(@Body() createAchievementDto: CreateAchievementDto) {
    return this.achievementsService.create(createAchievementDto);
  }

  @Get('query')
  findAllByQuery(@Query() query: { uid: string; date: string }) {
    if (!query) {
      return `The query is empty`;
    }

    if (query.uid && query.date) {
      try {
        return this.achievementsService.findAllByDate(query.uid, query.date);
      } catch (e) {
        logger.error(e);
        return e;
      }
    }
    if (query.uid) return this.achievementsService.findAllByUid(query.uid);

    return `The following queries are not supported: ${query}`;
  }

  @Get('today')
  findAllByToday(@Query() query: { uid: string; date: string }) {
    if (!query) {
      return 'The query is empty';
    }

    if (query.uid && query.date) {
      try {
        return this.achievementsService.findAllByToday(query.uid, query.date);
      } catch (e) {
        logger.error(e);
        return e;
      }
    }
    return 'done';
  }

  @Get()
  findAll() {
    return this.achievementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.achievementsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAchievementDto: UpdateAchievementDto,
  ) {
    try {
      return this.achievementsService.update(id, updateAchievementDto);
    } catch (e) {
      logger.error(e);
      return e;
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.achievementsService.remove(+id);
  }
}
