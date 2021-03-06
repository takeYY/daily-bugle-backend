import { Injectable } from '@nestjs/common';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';

import { firestore } from '../app.service';

const collectionRef = firestore.collection('achievements');

@Injectable()
export class AchievementsService {
  async create(createAchievementDto: CreateAchievementDto) {
    const docRef = await collectionRef.add({
      userId: createAchievementDto.userId,
      isAchieved: createAchievementDto.isAchieved,
      comment: createAchievementDto.comment,
      createdAt: new Date(),
    });
    const usersOrdinariesRef = await collectionRef
      .doc(docRef.id)
      .collection('usersOrdinaries')
      .add({
        ...createAchievementDto.usersOrdinaries,
      });
    const snapshot = await docRef.get();
    const data = snapshot.data();
    const newAchievementData = {
      id: docRef.id,
      ...data,
    };
    const collectionSnapshot = await usersOrdinariesRef.get();
    const newUsersOrdinaryData = {
      id: usersOrdinariesRef.id,
      ...collectionSnapshot.data(),
    };
    const result = {
      ...newAchievementData,
      usersOrdinaries: newUsersOrdinaryData,
    };

    return result;
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

  async findAllByUid(uid: string) {
    const snapshot = await collectionRef.where('userId', '==', uid).get();
    return await this.findAllBySnapshot(snapshot);
  }

  async findAllByDate(uid: string, date: string) {
    const snapshot = await collectionRef
      .where('userId', '==', uid)
      .orderBy('createdAt')
      .startAt(new Date(`${date} 00:00:00`))
      .endAt(new Date(`${date} 23:59:59`))
      .get();
    return await this.findAllBySnapshot(snapshot);
  }

  async findAllByToday(uid: string, date: string) {
    const today = new Date(`${date} `);
    const tomorrow = new Date(
      `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() + 1} `,
    );
    const achievementsByDate = await this.findAllByDate(uid, date);
    const achievements = achievementsByDate.filter((achievement) => {
      const startedOn = new Date(
        achievement.usersOrdinaries.startedOn._seconds * 1000,
      );
      const weeks = [];
      achievement.usersOrdinaries.weekdays.forEach((weekday) => {
        weeks.push(weekday.order % 7);
      });
      return (
        startedOn < tomorrow &&
        !achievement.usersOrdinaries.isClosed &&
        weeks.indexOf(today.getDay()) !== -1
      );
    });

    return achievements;
  }

  private async findAllBySnapshot(snapshot) {
    const docIds = [];
    const achievements = snapshot.docs.map((doc) => {
      docIds.push(doc.id);
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    const promise = docIds.map(async (docId, index) => {
      const usersOrdinaries = (
        await collectionRef.doc(docId).collection('usersOrdinaries').get()
      ).docs.map((uo) => {
        return {
          id: uo.id,
          ...uo.data(),
        };
      });
      return {
        ...achievements[index],
        usersOrdinaries: await (await Promise.all(usersOrdinaries)).shift(),
      };
    });
    return await Promise.all(promise);
  }

  findOne(id: number) {
    return `This action returns a #${id} achievement`;
  }

  async update(id: string, updateAchievementDto: UpdateAchievementDto) {
    const achievementRef = collectionRef.doc(id);
    const result = await achievementRef.set(
      {
        isAchieved: updateAchievementDto.isAchieved,
        comment: updateAchievementDto.comment,
      },
      { merge: true },
    );

    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} achievement`;
  }
}
