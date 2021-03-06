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
import { UsersOrdinariesService } from './users-ordinaries.service';
import { CreateUsersOrdinaryDto } from './dto/create-users-ordinary.dto';
import { UpdateUsersOrdinaryDto } from './dto/update-users-ordinary.dto';
import { logger } from 'firebase-functions/v1';

@Controller('users-ordinaries')
export class UsersOrdinariesController {
  constructor(
    private readonly usersOrdinariesService: UsersOrdinariesService,
  ) {}

  @Post()
  create(@Body() createUsersOrdinaryDto: CreateUsersOrdinaryDto) {
    return this.usersOrdinariesService.create(createUsersOrdinaryDto);
  }

  @Get('query')
  findAllByUid(@Query() query: { uid: string; date?: string }) {
    if (!query) {
      return { statusCode: 400, result: `The query is empty` };
    }
    if (query.uid && query.date) {
      try {
        return this.usersOrdinariesService.findAllByDate(query.uid, query.date);
      } catch (e) {
        logger.error(e);
        return e;
      }
    }
    if (query.uid) {
      try {
        return this.usersOrdinariesService.findAllByUid(query.uid);
      } catch (e) {
        logger.error(e);
        return e;
      }
    }
    return `Nothing`;
  }

  @Get('today')
  findAllByToday(@Query() query: { uid: string; date: string }) {
    if (!query) {
      return `The query is empty`;
    }

    if (query.uid && query.date) {
      try {
        return this.usersOrdinariesService.findAllByToday(
          query.uid,
          query.date,
        );
      } catch (e) {
        logger.error(e);
        return e;
      }
    }
    return 'done';
  }

  @Get()
  findAll() {
    return this.usersOrdinariesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersOrdinariesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsersOrdinaryDto: UpdateUsersOrdinaryDto,
  ) {
    return this.usersOrdinariesService.update(+id, updateUsersOrdinaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersOrdinariesService.remove(+id);
  }
}
