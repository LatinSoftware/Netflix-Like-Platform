import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './content.entity';
import { Genre } from './genre.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Content, Genre])],
    exports: [TypeOrmModule],
})
export class EntitiesModule {}
