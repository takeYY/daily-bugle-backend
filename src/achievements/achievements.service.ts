import { Injectable } from '@nestjs/common';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';

import { firestore } from '../app.service';

const collectionRef = firestore.collection('achievements');

@Injectable()
export class AchievementsService {
  async create(createAchievementDto: CreateAchievementDto) {
    const docRef = await collectionRef.add({
      usersOrdinariesId: createAchievementDto.usersOrdinariesId,
      isAchieved: createAchievementDto.isAchieved,
      comment: createAchievementDto.comment,
      createdAt: createAchievementDto.createdAt,
    });
    const snapshot = await docRef.get();
    const data = snapshot.data();
    const newAchievementData = {
      id: docRef.id,
      ...data,
    };

    return newAchievementData;
  }

  async findAll() {
    const snapshot = await collectionRef.get();
    const achievementList = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    return achievementList;
  }

  findOne(id: number) {
    return `This action returns a #${id} achievement`;
  }

  update(id: number, updateAchievementDto: UpdateAchievementDto) {
    return `This action updates a #${id} achievement`;
  }

  remove(id: number) {
    return `This action removes a #${id} achievement`;
  }
}
