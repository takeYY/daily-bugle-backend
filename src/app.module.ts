import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { MoodsModule } from './moods/moods.module';
import { UsersMoodsModule } from './users-moods/users-moods.module';
import { UsersModule } from './users/users.module';
import { OrdinariesModule } from './ordinaries/ordinaries.module';

@Module({
  imports: [TodosModule, MoodsModule, UsersMoodsModule, UsersModule, OrdinariesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
