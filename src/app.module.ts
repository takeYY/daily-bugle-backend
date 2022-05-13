import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { MoodsModule } from './moods/moods.module';

@Module({
  imports: [TodosModule, MoodsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
