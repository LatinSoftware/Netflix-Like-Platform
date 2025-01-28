import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { AggregatedRoot } from "./aggregatedRoot";
import { Genre } from "./genre.entity";
import { CategoryEnum } from "./Enums/category.enum";
import { ContentError } from "src/Shared/Messages/Errors/content.error";

@Entity()
export class Content implements AggregatedRoot {
    @PrimaryGeneratedColumn()
    private _id: number;
  
    @Column({ length: 100 })
    private _title: string;
  
    @Column({ type: "text" })
    private _description: string;
  
    @Column()
    private _releaseDate: Date;
  
    @Column()
    private _duration: number;
  
    @Column()
    private _ageRating: number;
  
    @Column({ length: 50 })
    private _originalLanguage: string;
  
    @Column({ type: "float", default: 0 })
    private _popularity: number;
  
    @Column({ type: "enum", enum: CategoryEnum })
    private _category: CategoryEnum;
  
    @ManyToMany(() => Genre, (genre) => genre.contents, { cascade: true })
    @JoinTable()
    private _genres: Genre[];
  
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
      this.setTitle(title);
      this.setDescription(description);
      this.setReleaseDate(releaseDate);
      this.setDuration(duration);
      this.setAgeRating(ageRating);
      this.setOriginalLanguage(originalLanguage);
      this.setPopularity(popularity);
      this.setCategory(category);
      this.setGenres(genres);
    }
  
    // Getters
    get id(): number {
      return this._id;
    }
  
    get title(): string {
      return this._title;
    }
  
    get description(): string {
      return this._description;
    }
  
    get releaseDate(): Date {
      return this._releaseDate;
    }
  
    get duration(): number {
      return this._duration;
    }
  
    get ageRating(): number {
      return this._ageRating;
    }
  
    get originalLanguage(): string {
      return this._originalLanguage;
    }
  
    get popularity(): number {
      return this._popularity;
    }
  
    get category(): CategoryEnum {
      return this._category;
    }
  
    get genres(): Genre[] {
      return this._genres;
    }
  
    // Setters with validations
    private setTitle(title: string): void {
        if (!title || title.length > 100) {
            throw ContentError.maxTitleLength;
        }
        this._title = title;
    }

    private setDescription(description: string): void {
        if (!description || description.length > 500) {
            throw ContentError.maxDescriptionLength;
        }
        this._description = description;
    }

    private setReleaseDate(releaseDate: Date): void {
        if (!(releaseDate instanceof Date)) {
            throw ContentError.validReleaseDate;
        }
        this._releaseDate = releaseDate;
    }

    private setDuration(duration: number): void {
        if (duration <= 0) {
            throw ContentError.validDuration;
        }
        this._duration = duration;
    }

    private setAgeRating(ageRating: number): void {
        if (ageRating < 0 || ageRating > 18) {
            throw ContentError.validAgeRating;
        }
        this._ageRating = ageRating;
    }

    private setOriginalLanguage(originalLanguage: string): void {
        if (!originalLanguage || originalLanguage.length > 50) {
            throw ContentError.validOriginalLanguage;
        }
        this._originalLanguage = originalLanguage;
    }

    private setPopularity(popularity: number): void {
        if (popularity < 0 || popularity > 100) {
            throw ContentError.validPopularity;
        }
        this._popularity = popularity;
    }

    private setCategory(category: CategoryEnum): void {
        if (!Object.values(CategoryEnum).includes(category)) {
            throw ContentError.validCategory;
        }
        this._category = category;
    }

    private setGenres(genres: Genre[]): void {
        if (!genres || genres.length === 0) {
            throw ContentError.validGenres;
        }
        this._genres = genres;
    }
  
    // Business Logic Methods

    public static create(
        title: string,
        description: string,
        releaseDate: Date,
        duration: number,
        ageRating: number,
        originalLanguage: string,
        category: CategoryEnum,
        genre: Genre[]
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
            genre
        );
    }
    
    public addGenre(genre: Genre): void {
      if (this._genres.find((g) => g.id === genre.id)) {
        throw  ContentError.genreAlreadyAssociated;
      }
      this._genres.push(genre);
    }
  
    public removeGenre(genreId: number): void {
      const genreIndex = this._genres.findIndex((g) => g.id === genreId);
      if (genreIndex === -1) {
        throw ContentError.genreNotFound;
      }
      this._genres.splice(genreIndex, 1);
    }
  
    public updatePopularity(score: number): void {
      if (score < 0 || score > 100) {
        throw ContentError.invalidPopularity;
      }
      this._popularity = score;
    }
  
    public isFamilyFriendly(): boolean {
      return this._ageRating <= 13;
    }
}
