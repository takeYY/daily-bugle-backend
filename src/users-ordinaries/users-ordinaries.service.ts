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
    return this.findAllBySnapshot(snapshot);
  }

  async findAllByUid(uid: string) {
    const snapshot = await collectionRef.where('userId', '==', uid).get();
    return this.findAllBySnapshot(snapshot);
  }

  async findAllByDate(uid: string, date: string) {
    const snapshot = await collectionRef
      .where('userId', '==', uid)
      .orderBy('startedOn')
      .endAt(new Date(`${date} 23:59:59`))
      .get();
    return this.findAllBySnapshot(snapshot);
  }

  // TODO: 曜日指定が動いていないので修正
  async findAllByToday(uid: string, date: string) {
    const today = new Date(`${date} `);
    const tomorrow = new Date(
      `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() + 1} `,
    );
    const usersOrdinariesByDate = await Promise.all(
      await this.findAllByDate(uid, date),
    );
    const usersOrdinaries = (await Promise.all(usersOrdinariesByDate)).filter(
      (usersOrdinary) => {
        const startedOn = new Date(usersOrdinary.startedOn._seconds * 1000);
        const weeks = [];
        usersOrdinary.weekdays.forEach((weekday) => {
          weeks.push(weekday.order % 7);
        });
        return (
          startedOn < tomorrow &&
          !usersOrdinary.isClosed &&
          weeks.indexOf(today.getDay() !== -1)
        );
      },
    );

    return usersOrdinaries;
  }

  private async findAllBySnapshot(snapshot) {
    const docIds = [];
    const usersOrdinaries = await snapshot.docs.map((doc) => {
      docIds.push(doc.id);
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    const promise = await docIds.map(async (docId, index) => {
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
        ordinary: await (await Promise.all(ordinary)).shift(),
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
