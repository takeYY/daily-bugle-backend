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

  async findAll() {
    const snapshot = await collectionRef.get();
    const usersOrdinaryList = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    return usersOrdinaryList;
  }

  async findAllByUid(uid: string) {
    const querySnapshot = await collectionRef.where('userId', '==', uid).get();
    const usersOrdinariesByUidList = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    return usersOrdinariesByUidList;
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
