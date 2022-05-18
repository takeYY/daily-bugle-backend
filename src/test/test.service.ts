import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

import { firestore } from '../app.service';

const collectionRef = firestore.collection('test-users');
const userRef = firestore.collection('test-users');
const ordinaryRef = firestore.collection('test-ordinaries');
const weekdayRef = firestore.collection('test-weekdays');

@Injectable()
export class TestService {
  async create(createTestDto: CreateTestDto) {
    // userの追加
    await [2, 3, 4, 5, 6, 7].forEach((n) => {
      userRef.add({
        name: `user-${n}`,
      });
    });

    // weekdayの追加
    await [
      { name: '月', order: 1, isChecked: false },
      { name: '火', order: 2, isChecked: false },
      { name: '水', order: 3, isChecked: false },
      { name: '木', order: 4, isChecked: false },
      { name: '金', order: 5, isChecked: false },
      { name: '土', order: 6, isChecked: false },
      { name: '日', order: 7, isChecked: false },
    ].forEach((dict) => {
      weekdayRef.add({
        name: dict.name,
        order: dict.order,
        isChecked: dict.isChecked,
      });
    });

    // ordinaryの追加
    await [
      '朝食を摂る',
      '歯を磨く',
      '掃除をする',
      '洗濯をする',
      '買い物に出かける',
    ].forEach((l) => {
      ordinaryRef.add({
        name: l,
      });
    });

    const docRef = await collectionRef.add({
      name: 'user-1',
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
