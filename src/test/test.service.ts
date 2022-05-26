import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

import { firestore } from '../app.service';
import { testUsers } from './data/test-user';
import { testWeekdays } from './data/test-weekday';
import { testOrdinaries } from './data/test-ordinary';
import { getTestUsersOrdinaries } from './data/test-usersOrdinary';
import { getTestAchievements } from './data/test-achievement';

const collectionRef = firestore.collection('users');
const userRef = firestore.collection('users');
const ordinaryRef = firestore.collection('ordinaries');
const weekdayRef = firestore.collection('weekdays');
const usersOrdinaryRef = firestore.collection('users-ordinaries');
const achievementsRef = firestore.collection('achievements');

async function addUser(user) {
  return await userRef.add(user);
}

@Injectable()
export class TestService {
  async create(createTestDto: CreateTestDto) {
    // userの追加
    const addUser = testUsers.map(async (testUser) => {
      return await userRef.add(testUser);
    });

    // weekdayの追加
    const addWeekdays = testWeekdays.map(async (testWeekday) => {
      return await weekdayRef.add(testWeekday);
    });

    // ordinaryの追加
    const addOrdinaries = testOrdinaries.map(async (testOrdinary) => {
      return await ordinaryRef.add(testOrdinary);
    });

    // usersOrdinariesの追加
    await Promise.all([addUser, addWeekdays, addOrdinaries])
      .then(async () => {
        const testUsersOrdinaries = await getTestUsersOrdinaries();
        await Promise.all(testUsersOrdinaries).then(async () => {
          console.log('@testUsersOrdinaries', testUsersOrdinaries);
          const addUsersOrdinaries = testUsersOrdinaries.map(
            async (usersOrdinary) => {
              return await usersOrdinaryRef.add(usersOrdinary);
            },
          );

          await Promise.all(addUsersOrdinaries)
            .then(async () => {
              // achievementsの追加
              const testAchievements = await getTestAchievements();
              await Promise.all(testAchievements).then(() => {
                testAchievements.map(async (testAchievement) => {
                  return await achievementsRef.add(testAchievement);
                });
              });
            })
            .catch((e) => {
              console.error(e);
              throw e;
            });
        });
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
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
