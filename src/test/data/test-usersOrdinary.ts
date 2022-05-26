import { firestore } from 'src/app.service';
import { CreateOrdinaryDto } from 'src/ordinaries/dto/create-ordinary.dto';
import { CreateUsersOrdinaryDto } from 'src/users-ordinaries/dto/create-users-ordinary.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateWeekdayDto } from 'src/weekdays/dto/create-weekday.dto';

const userRef = firestore.collection('test-users');
const ordinaryRef = firestore.collection('test-ordinaries');
const weekdayRef = firestore.collection('test-weekdays');

async function getUsers() {
  const userList: CreateUserDto[] = (await userRef.get()).docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      displayName: data.displayName,
      photoDataUrl: data.photoDataUrl,
    };
  });

  return userList;
}

async function getOrdinaries() {
  const ordinaryList: CreateOrdinaryDto[] = (await ordinaryRef.get()).docs.map(
    (doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
      };
    },
  );

  return ordinaryList;
}

async function getWeekdays() {
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

  return weekdayList;
}

export async function getTestUsersOrdinaries() {
  const userList = await getUsers();
  const ordinaryList = await getOrdinaries();
  const weekdayList = await getWeekdays();

  const usersOrdinaries: CreateUsersOrdinaryDto[] = userList.map((user) => {
    // TODO 複数のusersOrdinariesを作成する
    return {
      userId: user.id,
      ordinary: ordinaryList[0],
      weekdays: weekdayList,
      startedOn: new Date('2022-05-15'),
      createdAt: new Date(),
      updatedAt: new Date(),
      isClosed: false,
    };
  });
}
