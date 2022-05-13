import { Injectable } from '@nestjs/common';
import { CreateUsersMoodDto } from './dto/create-users-mood.dto';
import { UpdateUsersMoodDto } from './dto/update-users-mood.dto';

import { firestore } from '../app.service';

const collectionRef = firestore.collection('users-moods');

@Injectable()
export class UsersMoodsService {
  async create(createUsersMoodDto: CreateUsersMoodDto) {
    const docRef = await collectionRef.add({
      userId: createUsersMoodDto.userId,
      moodId: createUsersMoodDto.moodId,
      date: createUsersMoodDto.date,
    });
    const snapshot = await docRef.get();
    const data = snapshot.data();
    const newUsersMoodData = {
      id: docRef.id,
      ...data,
    };

    return newUsersMoodData;
  }

  async findAll() {
    const snapshot = await collectionRef.get();
    const usersMoodList = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    return usersMoodList;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersMood`;
  }

  update(id: number, updateUsersMoodDto: UpdateUsersMoodDto) {
    return `This action updates a #${id} usersMood`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersMood`;
  }
}
