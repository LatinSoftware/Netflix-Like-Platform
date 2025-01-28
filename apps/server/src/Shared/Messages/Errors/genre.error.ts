import { DomainException } from "src/Exceptions/DomainException";

export class GenreError {
    public static contentNotFound = (id: number): DomainException => new DomainException("Genre.NotFoundContent", `Content with id ${id} not found.`);
    public static contentAlreadyAssociated = (): DomainException => new DomainException("Genre.ContentAlreadyAssociated", "Content is already associated with this genre.");
    public static maxNameLength = (): DomainException => new DomainException("Genre.MaxNameLength", "Name must be a non-empty string with a maximum length of 100 characters.");
    public static maxDescriptionLength = (): DomainException => new DomainException("Genre.MaxDescriptionLength", "Description must be a string with a maximum length of 500 characters.");
    public static genreNotFound = (): DomainException => new DomainException("Genre.NotFound", "Genre not found.");
    
    
}