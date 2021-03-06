import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { MoodsModule } from './moods/moods.module';
import { UsersMoodsModule } from './users-moods/users-moods.module';
import { UsersModule } from './users/users.module';
import { OrdinariesModule } from './ordinaries/ordinaries.module';
import { UsersOrdinariesModule } from './users-ordinaries/users-ordinaries.module';
import { WeekdaysModule } from './weekdays/weekdays.module';
import { AchievementsModule } from './achievements/achievements.module';
import { TestModule } from './test/test.module';
import { TestMessageModule } from './test-message/test-message.module';

@Module({
  imports: [
    TodosModule,
    MoodsModule,
    UsersMoodsModule,
    UsersModule,
    OrdinariesModule,
    UsersOrdinariesModule,
    WeekdaysModule,
    AchievementsModule,
    TestModule,
    TestMessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
