import { Module } from '@nestjs/common';
import { UsersOrdinariesService } from './users-ordinaries.service';
import { UsersOrdinariesController } from './users-ordinaries.controller';

@Module({
  controllers: [UsersOrdinariesController],
  providers: [UsersOrdinariesService],
})
export class UsersOrdinariesModule {}
