import { Injectable } from '@nestjs/common';
import { CreateTestMessageDto } from './dto/create-test-message.dto';
import { UpdateTestMessageDto } from './dto/update-test-message.dto';

import { firestore } from '../app.service';

const collectionRef = firestore.collection('test-message');

@Injectable()
export class TestMessageService {
  async create(createTestDto: CreateTestMessageDto) {
    const docRef = await collectionRef.add({
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
    const snapshot = await collectionRef.get();

    const ordinaryList = snapshot.docs.map(async (doc) => {
      const weekdaysCollections = collectionRef
        .doc(doc.id)
        .collection('weekdays')
        .get();
      const weekdaysList = (await weekdaysCollections).docs.map((w) => {
        return {
          id: w.id,
          ...w.data(),
        };
      });
      console.log('@@@@@@@@@@@');
      console.log(weekdaysList);
      console.log(doc.id);
      console.log({ ...doc.data() });
      /* return {
        id: doc.id,
        weekdays: weekdaysList,
        ...doc.data(),
      }; */
      const result = weekdaysList.map((w) => {
        return {
          id: doc.id,
          ...doc.data(),
          ...w,
        };
      });
      console.log(result);
      return result;
    });

    return ordinaryList;
  }

  async testM(test: string) {
    /* const userList = [];
    firestore.collection('test').onSnapshot((ss) => {
      ss.forEach((result) => {
        userList.push(result);
      });
    }); */
    const userList: any = (await firestore.collection('test').get()).docs.map(
      (doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      },
    );
    const docRef = await collectionRef.add({
      name: test,
      userId: userList[2].id,
    });

    const weekdays: any = (
      await firestore.collection('weekdays').get()
    ).docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    weekdays.forEach((weekday) => {
      collectionRef.doc(docRef.id).collection('weekdays').add({
        id: weekday.id,
        name: weekday.name,
        order: weekday.order,
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
