import { firestore } from 'src/app.service';
import { CreateOrdinaryDto } from 'src/ordinaries/dto/create-ordinary.dto';
import { OrdinariesService } from 'src/ordinaries/ordinaries.service';
import { CreateUsersOrdinaryDto } from 'src/users-ordinaries/dto/create-users-ordinary.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { CreateWeekdayDto } from 'src/weekdays/dto/create-weekday.dto';
import { WeekdaysService } from 'src/weekdays/weekdays.service';

export async function getTestUsersOrdinaries() {
  const usersService = new UsersService();
  const ordinariesService = new OrdinariesService();
  const weekdaysService = new WeekdaysService();

  const userList = await usersService.findAll();
  const ordinaryList = await ordinariesService.findAll();
  const weekdayList = await weekdaysService.findAll();

  const usersOrdinaries = [];
  await Promise.all([userList, ordinaryList, weekdayList]).then(() => {
    usersOrdinaries.concat([
      {
        // 2. user-1, 平日, 05/15開始
        userId: userList[0].id,
        ordinary: ordinaryList[1],
        weekdays: weekdayList.slice(0, 6),
        startedOn: new Date('2022-05-15'),
        createdAt: new Date(),
        updatedAt: new Date(),
        isClosed: false,
      },
      {
        // 3. user-1, 土日, 05/15開始
        userId: userList[0].id,
        ordinary: ordinaryList[2],
        weekdays: weekdayList.slice(5),
        startedOn: new Date('2022-05-15'),
        createdAt: new Date(),
        updatedAt: new Date(),
        isClosed: false,
      },
      {
        // 4. user-1, 水曜日, 05-20開始
        userId: userList[0].id,
        ordinary: ordinaryList[4],
        weekdays: weekdayList.slice(2, 3),
        startedOn: new Date('2022-05-20'),
        createdAt: new Date(),
        updatedAt: new Date(),
        isClosed: false,
      },
      {
        // 5. user-2, 月・水・金, 05/31開始
        userId: userList[1].id,
        ordinary: ordinaryList[0],
        weekdays: [weekdayList[0], weekdayList[2], weekdayList[4]],
        startedOn: new Date('2022-05-31'),
        createdAt: new Date(),
        updatedAt: new Date(),
        isClosed: false,
      },
      {
        // 6. user-3, 毎日, 05/01開始
        userId: userList[2].id,
        ordinary: ordinaryList[0],
        weekdays: weekdayList,
        startedOn: new Date('2022-05-01'),
        createdAt: new Date(),
        updatedAt: new Date(),
        isClosed: false,
      },
      {
        // 7. user-3, 毎日, 05/01開始, closed
        userId: userList[2].id,
        ordinary: ordinaryList[1],
        weekdays: weekdayList,
        startedOn: new Date('2022-05-01'),
        createdAt: new Date(),
        updatedAt: new Date(),
        isClosed: true,
      },
    ]);
  });
  return usersOrdinaries;
}
