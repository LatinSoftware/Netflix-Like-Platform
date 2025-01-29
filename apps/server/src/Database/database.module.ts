import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host: config.get<string>('DB_HOST'),
                port: config.get<number>('DB_PORT'),
                username: config.get<string>('DB_USER'),
                password: config.get<string>('DB_PASSWORD'),
                database: config.get<string>('DB_NAME'),
                entities: [__dirname + '/../Entities/**/*.entity{.ts,.js}'],
                migrations: [__dirname + '/../Database/migrations/*{.ts,.js}'],
                namingStrategy: new SnakeNamingStrategy(),
                synchronize: true,
                logging: true,
            })
        }),
    ],
})
export class DatabaseModule{}