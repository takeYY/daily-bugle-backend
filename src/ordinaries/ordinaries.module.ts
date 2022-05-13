import { Module } from '@nestjs/common';
import { OrdinariesService } from './ordinaries.service';
import { OrdinariesController } from './ordinaries.controller';

@Module({
  controllers: [OrdinariesController],
  providers: [OrdinariesService]
})
export class OrdinariesModule {}
