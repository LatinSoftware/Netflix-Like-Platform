import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { AggregatedRoot } from "./aggregatedRoot";
import { Content } from "./content.entity";

import { IsString, MaxLength} from "class-validator";
import { Type } from "class-transformer";

@Entity()
export class Category implements AggregatedRoot {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    @IsString()
    @MaxLength(100 )
    name: string;

    @ManyToMany(() => Content, (content) => content.category)
    @JoinTable()
    @Type(() => Content)
    contents: Content[];
}
