import { Module } from '@nestjs/common';
import { GenreController } from './genre.controller';
import { EntitiesModule } from 'src/Entities/entities.module';
import { CqrsModule } from '@nestjs/cqrs';
import { Handlers } from '.';

@Module({
  imports: [EntitiesModule, CqrsModule],
  controllers: [GenreController],
  providers: [...Handlers],
})
export class GenreModule {}
