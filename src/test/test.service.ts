import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

import { firestore } from '../app.service';
import { testUsers } from './data/test-user';
import { testWeekdays } from './data/test-weekday';
import { testOrdinaries } from './data/test-ordinary';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateOrdinaryDto } from 'src/ordinaries/dto/create-ordinary.dto';
import { CreateWeekdayDto } from 'src/weekdays/dto/create-weekday.dto';

const collectionRef = firestore.collection('test-users');
const userRef = firestore.collection('test-users');
const ordinaryRef = firestore.collection('test-ordinaries');
const weekdayRef = firestore.collection('test-weekdays');

@Injectable()
export class TestService {
  async create(createTestDto: CreateTestDto) {
    // userの追加
    testUsers.forEach((testUser) => {
      userRef.add(testUser);
    });

    // weekdayの追加
    testWeekdays.forEach((testWeekday) => {
      weekdayRef.add(testWeekday);
    });

    // ordinaryの追加
    testOrdinaries.forEach((testOrdinary) => {
      ordinaryRef.add(testOrdinary);
    });

    // userList取得
    const userList: CreateUserDto[] = (await userRef.get()).docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        displayName: data.displayName,
        photoDataUrl: data.photoDataUrl,
      };
    });

    // ordinary取得
    const ordinaryList: CreateOrdinaryDto[] = (
      await ordinaryRef.get()
    ).docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
      };
    });

    // weekdays 取得
    const weekdayList: CreateWeekdayDto[] = (await weekdayRef.get()).docs.map(
      (doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          order: data.order,
          isChecked: data.isChecked,
        };
      },
    );

    // TODO: テスト用のusersOrdinaries作成

    return { result: 'done' };
  }

  async findAll() {
    const snapshot = await collectionRef.get();
    const ordinaryList = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    return ordinaryList;
  }

  findOne(id: number) {
    return `This action returns a #${id} test`;
  }

  update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`;
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
