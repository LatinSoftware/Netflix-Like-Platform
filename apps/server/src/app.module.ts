import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './Database/database.module';
import { EntitiesModule } from './Entities/entities.module';
import { GenreModule } from './feature/genre/genre.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ContentModule } from './feature/content/content.module';
import { CategoryModule } from './feature/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CqrsModule.forRoot(),
    DatabaseModule,
    EntitiesModule,
    GenreModule,
    ContentModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
