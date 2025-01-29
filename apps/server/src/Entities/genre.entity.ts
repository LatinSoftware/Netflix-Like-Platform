import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { AggregatedRoot } from "./aggregatedRoot";
import { Content } from "./content.entity";
import { GenreError } from "src/Shared/Messages/Errors/genre.error";
import { IsString, MaxLength, IsOptional, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@Entity()
export class Genre implements AggregatedRoot {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    @IsString({ message: GenreError.maxNameLength.message })
    @MaxLength(100, { message: GenreError.maxNameLength.message })
    name: string;

    @Column({ type: "text", nullable: true })
    @IsString({ message: GenreError.maxDescriptionLength.message })
    @MaxLength(500, { message: GenreError.maxDescriptionLength.message })
    @IsOptional()
    description?: string;

    @ManyToMany(() => Content, (content) => content.genres)
    @Type(() => Content)
    contents: Content[];

    constructor(name: string, description?: string) {
        this.name = name;
        this.description = description || "";
    }

    public addContent(content: Content): void {
        if (this.contents.find((c) => c.id === content.id)) {
            throw GenreError.contentAlreadyAssociated;
        }
        this.contents.push(content);
    }

    public removeContent(contentId: number): void {
        const contentIndex = this.contents.findIndex((c) => c.id === contentId);
        if (contentIndex === -1) {
            throw GenreError.contentNotFound;
        }
        this.contents.splice(contentIndex, 1);
    }
}
