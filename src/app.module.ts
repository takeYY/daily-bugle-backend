import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { MoodsModule } from './moods/moods.module';
import { UsersMoodsModule } from './users-moods/users-moods.module';

@Module({
  imports: [TodosModule, MoodsModule, UsersMoodsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
