import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './Database/database.module';
import { EntitiesModule } from './Entities/entities.module';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule,  EntitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
