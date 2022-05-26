import { UsersOrdinariesService } from 'src/users-ordinaries/users-ordinaries.service';

export async function getTestAchievements() {
  const usersOrdinaryService = new UsersOrdinariesService();
  const usersOrdinaries = await usersOrdinaryService.findAll();

  /* 
      // 0. user-1, 毎日
        startedOn: new Date('2022-05-15'),
        isClosed: false,

      // 1. user-1, 平日, 05/15開始
        startedOn: new Date('2022-05-15'),
        isClosed: false,

      // 2. user-1, 土日, 05/15開始
        startedOn: new Date('2022-05-15'),
        isClosed: false,

      // 3. user-1, 水曜日, 05-20開始
        startedOn: new Date('2022-05-20'),
        isClosed: false,

      // 4. user-2, 月・水・金, 05/31開始
        startedOn: new Date('2022-05-31'),
        isClosed: false,

      // 5. user-3, 毎日, 05/01開始
        startedOn: new Date('2022-05-01'),
        isClosed: false,

      // 6. user-3, 毎日, 05/01開始, closed
        startedOn: new Date('2022-05-01'),
        isClosed: true,
  */

  const achievements = [];
  await Promise.all(usersOrdinaries)
    .then(() => {
      achievements.concat([
        {
          // 0. user-3, 達成, 05/01
          userId: usersOrdinaries[5].userId,
          isAchieved: true,
          comment: '',
          createdAt: new Date('2022-05-01'),
          usersOrdinaries: {
            ...usersOrdinaries[5],
            ordinary: usersOrdinaries[5].ordinary[0],
          },
        },
        {
          // 1. user-3, 達成, 05/02
          userId: usersOrdinaries[5].userId,
          isAchieved: true,
          comment: '',
          createdAt: new Date('2022-05-02'),
          usersOrdinaries: {
            ...usersOrdinaries[5],
            ordinary: usersOrdinaries[5].ordinary[0],
          },
        },
        {
          // 2. user-3, 達成, 05/05
          userId: usersOrdinaries[5].userId,
          isAchieved: true,
          comment: '',
          createdAt: new Date('2022-05-05'),
          usersOrdinaries: {
            ...usersOrdinaries[5],
            ordinary: usersOrdinaries[5].ordinary[0],
          },
        },
        {
          // 3. user-3, 未達成, 05/06
          userId: usersOrdinaries[5].userId,
          isAchieved: false,
          comment: '',
          createdAt: new Date('2022-05-06'),
          usersOrdinaries: {
            ...usersOrdinaries[5],
            ordinary: usersOrdinaries[5].ordinary[0],
          },
        },
        {
          // 4. user-3, 達成, 05/01
          userId: usersOrdinaries[6].userId,
          isAchieved: true,
          comment: '',
          createdAt: new Date('2022-05-01'),
          usersOrdinaries: {
            ...usersOrdinaries[6],
            ordinary: usersOrdinaries[6].ordinary[0],
          },
        },
        {
          // 5. user-3, 達成, 05/015
          userId: usersOrdinaries[6].userId,
          isAchieved: true,
          comment: '',
          createdAt: new Date('2022-05-15'),
          usersOrdinaries: {
            ...usersOrdinaries[6],
            ordinary: usersOrdinaries[6].ordinary[0],
          },
        },
        {
          // 6. user-1, 達成, 05/15
          userId: usersOrdinaries[0].userId,
          isAchieved: true,
          comment: '',
          createdAt: new Date('2022-05-15'),
          usersOrdinaries: {
            ...usersOrdinaries[0],
            ordinary: usersOrdinaries[0].ordinary[0],
          },
        },
        {
          // 7. user-1, 達成, 05/16
          userId: usersOrdinaries[1].userId,
          isAchieved: true,
          comment: '',
          createdAt: new Date('2022-05-16'),
          usersOrdinaries: {
            ...usersOrdinaries[1],
            ordinary: usersOrdinaries[1].ordinary[0],
          },
        },
        {
          // 8. user-1, 達成, 05/17
          userId: usersOrdinaries[1].userId,
          isAchieved: true,
          comment: '',
          createdAt: new Date('2022-05-17'),
          usersOrdinaries: {
            ...usersOrdinaries[1],
            ordinary: usersOrdinaries[1].ordinary[0],
          },
        },
        {
          // 9. user-1, 達成, 05/18
          userId: usersOrdinaries[1].userId,
          isAchieved: true,
          comment: '',
          createdAt: new Date('2022-05-18'),
          usersOrdinaries: {
            ...usersOrdinaries[1],
            ordinary: usersOrdinaries[1].ordinary[0],
          },
        },
        {
          // 10. user-1, 達成, 05/19
          userId: usersOrdinaries[1].userId,
          isAchieved: true,
          comment: '',
          createdAt: new Date('2022-05-19'),
          usersOrdinaries: {
            ...usersOrdinaries[1],
            ordinary: usersOrdinaries[1].ordinary[0],
          },
        },
        {
          // 11. user-1, 未達成, 05/20
          userId: usersOrdinaries[1].userId,
          isAchieved: false,
          comment: '',
          createdAt: new Date('2022-05-20'),
          usersOrdinaries: {
            ...usersOrdinaries[1],
            ordinary: usersOrdinaries[1].ordinary[0],
          },
        },
        {
          // 12. user-1, 達成, 05/15
          userId: usersOrdinaries[2].userId,
          isAchieved: true,
          comment: '',
          createdAt: new Date('2022-05-15'),
          usersOrdinaries: {
            ...usersOrdinaries[2],
            ordinary: usersOrdinaries[2].ordinary[0],
          },
        },
        {
          // 13. user-1, 達成, 05/21
          userId: usersOrdinaries[2].userId,
          isAchieved: true,
          comment: '',
          createdAt: new Date('2022-05-21'),
          usersOrdinaries: {
            ...usersOrdinaries[2],
            ordinary: usersOrdinaries[2].ordinary[0],
          },
        },
        {
          // 14. user-1, 未達成, 05/22
          userId: usersOrdinaries[2].userId,
          isAchieved: false,
          comment: '',
          createdAt: new Date('2022-05-22'),
          usersOrdinaries: {
            ...usersOrdinaries[2],
            ordinary: usersOrdinaries[2].ordinary[0],
          },
        },
        {
          // 15. user-1, 達成, 05/28
          userId: usersOrdinaries[2].userId,
          isAchieved: true,
          comment: '',
          createdAt: new Date('2022-05-28'),
          usersOrdinaries: {
            ...usersOrdinaries[2],
            ordinary: usersOrdinaries[2].ordinary[0],
          },
        },
        {
          // 16. user-1, 達成, 05/25
          userId: usersOrdinaries[3].userId,
          isAchieved: true,
          comment: '',
          createdAt: new Date('2022-05-25'),
          usersOrdinaries: {
            ...usersOrdinaries[3],
            ordinary: usersOrdinaries[3].ordinary[0],
          },
        },
        {
          // 17. user-1, 達成, 06/01
          userId: usersOrdinaries[4].userId,
          isAchieved: true,
          comment: '',
          createdAt: new Date('2022-06-01'),
          usersOrdinaries: {
            ...usersOrdinaries[4],
            ordinary: usersOrdinaries[4].ordinary[0],
          },
        },
      ]);
    })
    .finally(() => {
      return achievements;
    })
    .catch((e) => {
      return achievements;
    });

  return achievements;
}
