import { Injectable } from '@nestjs/common';
import { CreateUsersOrdinaryDto } from './dto/create-users-ordinary.dto';
import { UpdateUsersOrdinaryDto } from './dto/update-users-ordinary.dto';

import { firestore } from '../app.service';
import { CreateOrdinaryDto } from 'src/ordinaries/dto/create-ordinary.dto';
import { CreateWeekdayDto } from 'src/weekdays/dto/create-weekday.dto';

const collectionRef = firestore.collection('users-ordinaries');

@Injectable()
export class UsersOrdinariesService {
  async create(createUsersOrdinaryDto: CreateUsersOrdinaryDto) {
    const docRef = await collectionRef.add({
      userId: createUsersOrdinaryDto.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      startedOn: new Date(createUsersOrdinaryDto.startedOn),
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
    const docIds = [];
    const usersOrdinaries = snapshot.docs.map((doc) => {
      docIds.push(doc.id);
      const data = doc.data();
      return {
        id: doc.id,
        userId: data.userId,
        startedOn: data.startedOn,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        isClosed: data.isClosed,
        //...doc.data(),
      };
    });
    const promise = docIds.map(async (docId, index) => {
      const ordinary: CreateOrdinaryDto[] = (
        await collectionRef.doc(docId).collection('ordinary').get()
      ).docs.map((o) => {
        return {
          id: o.id,
          name: o.data().name,
        };
      });
      const weekday: CreateWeekdayDto[] = (
        await collectionRef.doc(docId).collection('weekdays').get()
      ).docs.map((w) => {
        return {
          id: w.id,
          name: w.data().name,
          order: w.data().order,
          isChecked: w.data().isChecked,
        };
      });
      return {
        ...usersOrdinaries[index],
        userId: usersOrdinaries[index].userId,
        startedOn: usersOrdinaries[index].startedOn,
        createdAt: usersOrdinaries[index].createdAt,
        updatedAt: usersOrdinaries[index].updatedAt,
        isClosed: usersOrdinaries[index].isClosed,
        ordinary: await Promise.all(ordinary),
        weekdays: await Promise.all(weekday),
      };
    });
    return await Promise.all(promise);
  }

  async findAllByUid(uid: string) {
    const querySnapshot = await collectionRef.where('userId', '==', uid).get();
    const docIds = [];
    const usersOrdinaries = querySnapshot.docs.map((doc) => {
      docIds.push(doc.id);
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    const promise = docIds.map(async (docId, index) => {
      const ordinary = (
        await collectionRef.doc(docId).collection('ordinary').get()
      ).docs.map((o) => {
        return {
          id: o.id,
          ...o.data(),
        };
      });
      const weekday = (
        await collectionRef.doc(docId).collection('weekdays').get()
      ).docs.map((w) => {
        return {
          id: w.id,
          ...w.data(),
        };
      });
      return {
        ...usersOrdinaries[index],
        ordinary: await Promise.all(ordinary),
        weekdays: await Promise.all(weekday),
      };
    });
    return await Promise.all(promise);
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
