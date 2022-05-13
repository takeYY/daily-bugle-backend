import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdinariesService } from './ordinaries.service';
import { CreateOrdinaryDto } from './dto/create-ordinary.dto';
import { UpdateOrdinaryDto } from './dto/update-ordinary.dto';

@Controller('ordinaries')
export class OrdinariesController {
  constructor(private readonly ordinariesService: OrdinariesService) {}

  @Post()
  create(@Body() createOrdinaryDto: CreateOrdinaryDto) {
    return this.ordinariesService.create(createOrdinaryDto);
  }

  @Get()
  findAll() {
    return this.ordinariesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordinariesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrdinaryDto: UpdateOrdinaryDto,
  ) {
    return this.ordinariesService.update(+id, updateOrdinaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordinariesService.remove(+id);
  }
}
