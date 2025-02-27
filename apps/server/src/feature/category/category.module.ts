import { Module } from '@nestjs/common';

import { CategoryController } from './category.controller';
import { EntitiesModule } from 'src/Entities/entities.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [EntitiesModule, CqrsModule],
  controllers: [CategoryController],
  providers: [],
})
export class CategoryModule {}
