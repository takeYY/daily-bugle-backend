import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

import { firestore } from '../app.service';

const collectionRef = firestore.collection('test');

@Injectable()
export class TestService {
  async create(createTestDto: CreateTestDto) {
    await [2, 3, 4, 5, 6].forEach((n) => {
      collectionRef.add({
        name: `test${n}`,
      });
    });
    await [
      { name: '月', order: 1, isChecked: false },
      { name: '火', order: 2, isChecked: false },
      { name: '日', order: 7, isChecked: false },
    ].forEach((dict) => {
      firestore.collection('weekdays').add({
        name: dict.name,
        order: dict.order,
        isChecked: dict.isChecked,
      });
    });
    const docRef = await collectionRef.add({
      name: 'test1',
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
