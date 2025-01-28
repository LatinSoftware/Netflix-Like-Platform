import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { AggregatedRoot } from "./aggregatedRoot";
import { Content } from "./content.entity";
import { DomainException } from "src/Exceptions/DomainException";
import { GenreError } from "src/Shared/Messages/Errors/genre.error";

@Entity()
export class Genre implements AggregatedRoot {
    @PrimaryGeneratedColumn()
    private _id: number;

    @Column({ length: 100 })
    private _name: string;

    @Column({ type: "text", nullable: true })
    private _description: string;

    @ManyToMany(() => Content, (content) => content.genres)
    private _contents: Content[];

    constructor(name: string, description?: string) {
        this._name = name;
        this._description = description || '';
        this._contents = [];
    }

    // Getters and Setters
    public get id(): number {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        if (!value || value.length > 100) {
            throw GenreError.maxNameLength();
        }
        this._name = value;
    }

    public get description(): string {
        return this._description;
    }

    public set description(value: string) {
        if (value && value.length > 500) {
            throw GenreError.maxDescriptionLength();
        }
        this._description = value;
    }

    public get contents(): Content[] {
        return this._contents;
    }

    public addContent(content: Content): void {
        if (this._contents.find((c) => c.id === content.id)) {
            throw GenreError.contentAlreadyAssociated();
        }
        this._contents.push(content);
    }

    public removeContent(contentId: number): void {
        const contentIndex = this._contents.findIndex((c) => c.id === contentId);
        if (contentIndex === -1) {
            throw GenreError.contentNotFound(contentId);
        }
        this._contents.splice(contentIndex, 1);
    }
}
