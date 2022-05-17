import { Injectable } from '@nestjs/common';
import { CreateUsersOrdinaryDto } from './dto/create-users-ordinary.dto';
import { UpdateUsersOrdinaryDto } from './dto/update-users-ordinary.dto';

import { firestore } from '../app.service';

const collectionRef = firestore.collection('users-ordinaries');

@Injectable()
export class UsersOrdinariesService {
  async create(createUsersOrdinaryDto: CreateUsersOrdinaryDto) {
    const docRef = await collectionRef.add({
      userId: createUsersOrdinaryDto.userId,
      ordinaryId: createUsersOrdinaryDto.ordinaryId,
      weekdayId: createUsersOrdinaryDto.weekdayId,
      startedOn: createUsersOrdinaryDto.startedOn,
      createdAt: createUsersOrdinaryDto.createdAt,
      updatedAt: createUsersOrdinaryDto.updatedAt,
    });
    const snapshot = await docRef.get();
    const data = snapshot.data();
    const newUsersOrdinaryData = {
      id: docRef.id,
      ...data,
    };

    return newUsersOrdinaryData;
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
