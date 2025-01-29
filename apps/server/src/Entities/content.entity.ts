import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { AggregatedRoot } from "./aggregatedRoot";
import { Genre } from "./genre.entity";
import { CategoryEnum } from "./Enums/category.enum";
import { ContentError } from "src/Shared/Messages/Errors/content.error";
import { IsString, IsInt, IsEnum, IsDate, IsPositive, MaxLength, Min, Max, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@Entity()
export class Content implements AggregatedRoot {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    @IsString({ message: ContentError.maxTitleLength.message })
    @MaxLength(100, { message: ContentError.maxTitleLength.message })
    title: string;

    @Column({ type: "text" })
    @IsString({ message: ContentError.maxDescriptionLength.message })
    @MaxLength(500, { message: ContentError.maxDescriptionLength.message })
    description: string;

    @Column()
    @IsDate({ message: ContentError.validReleaseDate.message })
    releaseDate: Date;

    @Column()
    @IsInt({ message: ContentError.validDuration.message })
    @IsPositive({ message: ContentError.validDuration.message })
    duration: number;

    @Column()
    @IsInt({ message: ContentError.validAgeRating.message })
    @Min(0, { message: ContentError.validAgeRating.message })
    @Max(18, { message: ContentError.validAgeRating.message })
    ageRating: number;

    @Column({ length: 50 })
    @IsString({ message: ContentError.validOriginalLanguage.message })
    @MaxLength(50, { message: ContentError.validOriginalLanguage.message })
    originalLanguage: string;

    @Column({ type: "float", default: 0 })
    @IsPositive({ message: ContentError.validPopularity.message })
    @Max(100, { message: ContentError.validPopularity.message })
    popularity: number;

    @Column({ type: "enum", enum: CategoryEnum })
    @IsEnum(CategoryEnum, { message: ContentError.validCategory.message })
    category: CategoryEnum;

    @ManyToMany(() => Genre, (genre) => genre.contents, { cascade: true })
    @JoinTable()
    @IsArray({ message: ContentError.validGenres.message })
    @ValidateNested({ each: true, message: ContentError.validGenres.message })
    @Type(() => Genre)
    genres: Genre[];

    constructor(
        title: string,
        description: string,
        releaseDate: Date,
        duration: number,
        ageRating: number,
        originalLanguage: string,
        popularity: number,
        category: CategoryEnum,
        genres: Genre[]
    ) {
        this.title = title;
        this.description = description;
        this.releaseDate = releaseDate;
        this.duration = duration;
        this.ageRating = ageRating;
        this.originalLanguage = originalLanguage;
        this.popularity = popularity;
        this.category = category;
        this.genres = genres;
    }

    public static create(
        title: string,
        description: string,
        releaseDate: Date,
        duration: number,
        ageRating: number,
        originalLanguage: string,
        category: CategoryEnum,
        genres: Genre[]
    ): Content {
        return new Content(
            title,
            description,
            releaseDate,
            duration,
            ageRating,
            originalLanguage,
            0,
            category,
            genres
        );
    }

    public addGenre(genre: Genre): void {
        if (this.genres.find((g) => g.id === genre.id)) {
            throw ContentError.genreAlreadyAssociated;
        }
        this.genres.push(genre);
    }

    public removeGenre(genreId: number): void {
        const genreIndex = this.genres.findIndex((g) => g.id === genreId);
        if (genreIndex === -1) {
            throw ContentError.genreNotFound;
        }
        this.genres.splice(genreIndex, 1);
    }

    public updatePopularity(score: number): void {
        if (score < 0 || score > 100) {
            throw ContentError.invalidPopularity;
        }
        this.popularity = score;
    }

    public isFamilyFriendly(): boolean {
        return this.ageRating <= 13;
    }
}
