import { Module } from '@nestjs/common';
import { UsersMoodsService } from './users-moods.service';
import { UsersMoodsController } from './users-moods.controller';

@Module({
  controllers: [UsersMoodsController],
  providers: [UsersMoodsService],
})
export class UsersMoodsModule {}
