import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersOrdinariesService } from './users-ordinaries.service';
import { CreateUsersOrdinaryDto } from './dto/create-users-ordinary.dto';
import { UpdateUsersOrdinaryDto } from './dto/update-users-ordinary.dto';

@Controller('users-ordinaries')
export class UsersOrdinariesController {
  constructor(private readonly usersOrdinariesService: UsersOrdinariesService) {}

  @Post()
  create(@Body() createUsersOrdinaryDto: CreateUsersOrdinaryDto) {
    return this.usersOrdinariesService.create(createUsersOrdinaryDto);
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
  update(@Param('id') id: string, @Body() updateUsersOrdinaryDto: UpdateUsersOrdinaryDto) {
    return this.usersOrdinariesService.update(+id, updateUsersOrdinaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersOrdinariesService.remove(+id);
  }
}
