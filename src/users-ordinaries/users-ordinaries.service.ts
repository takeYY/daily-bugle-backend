import { Injectable } from '@nestjs/common';
import { CreateUsersOrdinaryDto } from './dto/create-users-ordinary.dto';
import { UpdateUsersOrdinaryDto } from './dto/update-users-ordinary.dto';

@Injectable()
export class UsersOrdinariesService {
  create(createUsersOrdinaryDto: CreateUsersOrdinaryDto) {
    return 'This action adds a new usersOrdinary';
  }

  findAll() {
    return `This action returns all usersOrdinaries`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersOrdinary`;
  }

  update(id: number, updateUsersOrdinaryDto: UpdateUsersOrdinaryDto) {
    return `This action updates a #${id} usersOrdinary`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersOrdinary`;
  }
}
