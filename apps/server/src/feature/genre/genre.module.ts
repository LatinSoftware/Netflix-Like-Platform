import { Module } from '@nestjs/common';
import { GenreController } from './genre.controller';
import { EntitiesModule } from 'src/Entities/entities.module';
import { GenreCreateCommandHandler } from './genreCreate';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [EntitiesModule, CqrsModule],
  controllers: [GenreController],
  providers: [GenreCreateCommandHandler],
})
export class GenreModule {}
