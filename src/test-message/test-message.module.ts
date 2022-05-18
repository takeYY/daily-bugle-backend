import { Module } from '@nestjs/common';
import { TestMessageService } from './test-message.service';
import { TestMessageController } from './test-message.controller';

@Module({
  controllers: [TestMessageController],
  providers: [TestMessageService]
})
export class TestMessageModule {}
