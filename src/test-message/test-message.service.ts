import { Injectable } from '@nestjs/common';
import { CreateTestMessageDto } from './dto/create-test-message.dto';
import { UpdateTestMessageDto } from './dto/update-test-message.dto';

import { firestore } from '../app.service';

const userRef = firestore.collection('test-users');
const ordinaryRef = firestore.collection('test-ordinaries');
const weekdayRef = firestore.collection('test-weekdays');
const usersOrdinaryRef = firestore.collection('test-users-ordinaries');

@Injectable()
export class TestMessageService {
  async create(createTestDto: CreateTestMessageDto) {
    const docRef = await usersOrdinaryRef.add({
      name: createTestDto.name,
      testUser: createTestDto.testUser,
      weekdays: createTestDto.weekdays,
    });
    const snapshot = await docRef.get();
    const data = snapshot.data();
    const newOrdinaryData = {
      id: docRef.id,
      ...data,
    };

    return newOrdinaryData;
  }

  async findAll() {
    //const snapshot = await usersOrdinaryRef.get();
    let documentId: string;
    // users-ordinariesのcollection以外を取得
    const usersOrdinaryList = (await usersOrdinaryRef.get()).docs.map((doc) => {
      documentId = doc.id;
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    // weekdaysコレクションを取得
    const weekdaysCollections = await usersOrdinaryRef
      .doc(documentId)
      .collection('weekdays')
      .get();
    const weekdaysList = weekdaysCollections.docs.map((w) => {
      return {
        id: w.id,
        ...w.data(),
      };
    });

    // ordinaryコレクションを取得
    const ordinaryCollections = await usersOrdinaryRef
      .doc(documentId)
      .collection('ordinary')
      .get();
    const ordinary = ordinaryCollections.docs.map((o) => {
      return {
        id: o.id,
        ...o.data(),
      };
    })[0];

    // コレクションも含めてresultに渡す
    const result = usersOrdinaryList.map((usersOrdinary) => {
      return {
        ...usersOrdinary,
        ordinary: ordinary,
        weekdays: weekdaysList.map((weekday) => {
          return { ...weekday };
        }),
      };
    });
    return result;
  }

  async testM(testUser: string) {
    // userList取得
    const userList: any = (await userRef.get()).docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    // user id取得
    const userId: string = (await userRef.where('name', '==', testUser).get())
      .docs[0].id;

    console.log('userId:', userId);

    // ordinary取得
    const ordinaryList = (await ordinaryRef.get()).docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    // weekdays 取得
    const weekdayList = (await weekdayRef.get()).docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    const tmp1 = await usersOrdinaryRef.add({
      userId: userList[0].id,
      createdAt: new Date(),
      isClosed: false,
      startedOn: new Date('2022-05-25'),
    });
    const tmp2 = await usersOrdinaryRef.add({
      userId: userList[1].id,
      createdAt: new Date(),
      isClosed: false,
      startedOn: new Date('2022-05-25'),
    });
    const tmp3 = await usersOrdinaryRef.add({
      userId: userList[2].id,
      createdAt: new Date(),
      isClosed: false,
      startedOn: new Date('2022-05-25'),
    });
    const tmp4 = await usersOrdinaryRef.add({
      userId: userList[2].id,
      createdAt: new Date(),
      isClosed: false,
      startedOn: new Date('2022-05-24'),
    });
    const usersOrdinariesList = [tmp1, tmp2, tmp3, tmp4];
    console.log('@@@@ users ordinary @@@@');
    console.log(usersOrdinariesList);

    usersOrdinariesList.forEach((usersOrdinary) => {
      const rand = Math.floor(Math.random() * ordinaryList.length);
      const ordinary = ordinaryList[rand];
      usersOrdinaryRef
        .doc(usersOrdinary.id)
        .collection('ordinary')
        .add({
          ...ordinary,
        });
      [1, 2, 3].forEach((i) => {
        const r = Math.floor(Math.random() * weekdayList.length);
        const weekday = weekdayList[r];
        usersOrdinaryRef
          .doc(usersOrdinary.id)
          .collection('weekdays')
          .add({
            ...weekday,
          });
      });
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} testMessage`;
  }

  update(id: number, updateTestMessageDto: UpdateTestMessageDto) {
    return `This action updates a #${id} testMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} testMessage`;
  }
}
