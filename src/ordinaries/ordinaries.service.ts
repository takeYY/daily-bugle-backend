import { Injectable } from '@nestjs/common';
import { CreateOrdinaryDto } from './dto/create-ordinary.dto';
import { UpdateOrdinaryDto } from './dto/update-ordinary.dto';

@Injectable()
export class OrdinariesService {
  create(createOrdinaryDto: CreateOrdinaryDto) {
    return 'This action adds a new ordinary';
  }

  findAll() {
    return `This action returns all ordinaries`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordinary`;
  }

  update(id: number, updateOrdinaryDto: UpdateOrdinaryDto) {
    return `This action updates a #${id} ordinary`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordinary`;
  }
}
