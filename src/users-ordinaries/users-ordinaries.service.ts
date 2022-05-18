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
      createdAt: new Date(),
      updatedAt: new Date(),
      startedOn: createUsersOrdinaryDto.startedOn,
      isClosed: createUsersOrdinaryDto.isClosed,
    });
    collectionRef
      .doc(docRef.id)
      .collection('ordinary')
      .add({
        ...createUsersOrdinaryDto.ordinary,
      });
    createUsersOrdinaryDto.weekdays.forEach((weekday) => {
      collectionRef
        .doc(docRef.id)
        .collection('weekdays')
        .add({
          ...weekday,
        });
    });
    const snapshot = await docRef.get();
    const data = snapshot.data();
    const ordinary = (
      await collectionRef.doc(docRef.id).collection('ordinary').get()
    ).docs.map((o) => {
      return {
        id: o.id,
        ...o.data(),
      };
    })[0];
    const weekdays = (
      await collectionRef.doc(docRef.id).collection('weekdays').get()
    ).docs.map((w) => {
      return {
        id: w.id,
        ...w.data(),
      };
    });
    const newUsersOrdinaryData = {
      id: docRef.id,
      ...data,
    };
    const result = {
      ...newUsersOrdinaryData,
      ordinary: ordinary,
      weekdays: weekdays,
    };

    return result;
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
    //let docRef = [];
    const docRef = [];
    const usersOrdinaries = querySnapshot.docs.map((doc) => {
      docRef.push(doc.ref);
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    const ordinaries = [];
    const weekdays = [];
    docRef.forEach(async (dRef) => {
      const ordinary = (await dRef.collection('ordinary').get()).docs.map(
        (o) => {
          return {
            id: o.id,
            ...o.data(),
          };
        },
      )[0];
      ordinaries.push(ordinary);
      const weekday = (await docRef[0].collection('weekdays').get()).docs.map(
        (w) => {
          return {
            id: w.id,
            ...w.data(),
          };
        },
      );
      weekdays.push(weekday);
    });

    const result = [];
    for (let i = 0; i < docRef.length; i++) {
      result.push({
        ...usersOrdinaries[i],
        ordinary: ordinaries[i],
        weekdays: weekdays[i],
      });
    }

    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersOrdinary`;
  }

  update(id: number, updateUsersOrdinaryDto: UpdateUsersOrdinaryDto) {
    console.log(updateUsersOrdinaryDto);
    return `This action updates a #${id} usersOrdinary`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersOrdinary`;
  }
}
