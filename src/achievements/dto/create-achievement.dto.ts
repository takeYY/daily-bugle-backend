import { CreateUsersOrdinaryDto } from 'src/users-ordinaries/dto/create-users-ordinary.dto';

export class CreateAchievementDto {
  id?: string;
  userId: string;
  usersOrdinaries: CreateUsersOrdinaryDto;
  isAchieved: boolean;
  comment: string;
  createdAt: Date;
}
