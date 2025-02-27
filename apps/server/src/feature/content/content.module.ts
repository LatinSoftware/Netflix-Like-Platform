import { Module } from '@nestjs/common';

import { ContentController } from './content.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { EntitiesModule } from 'src/Entities/entities.module';
import { handlers } from '.';

@Module({
  imports: [EntitiesModule, CqrsModule],
  controllers: [ContentController],
  providers: [...handlers],
})
export class ContentModule {}
