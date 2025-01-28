import { CategoryEnum } from "src/Entities/Enums/category.enum";
import { DomainException } from "src/Exceptions/DomainException";

export class ContentError{

    public static maxTitleLength: DomainException = new DomainException("Content.maxTitleLength", "The title must be less than 100 characters");
    public static maxDescriptionLength: DomainException = new DomainException("Content.maxDescriptionLength", "The description must be less than 500 characters");
    public static validReleaseDate: DomainException = new DomainException("Content.validReleaseDate", "The release date must be a valid date");
    public static validDuration: DomainException = new DomainException("Content.validDuration", "The duration must be a valid number");
    public static validAgeRating: DomainException = new DomainException("Content.validAgeRating", "The age rating must be a valid number");
    public static validOriginalLanguage: DomainException = new DomainException("Content.validOriginalLanguage", "The original language must be a valid string");
    public static validPopularity: DomainException = new DomainException("Content.validPopularity", "The popularity must be a valid number");
    public static validCategory: DomainException = new DomainException("Content.validCategory", `The category must be one of the following values: ${Object.values(CategoryEnum).join(", ")}`);
    public static validGenres: DomainException = new DomainException("Content.validGenres", "At least one genre is required");
    public static genreAlreadyAssociated: DomainException = new DomainException("Content.genreAlreadyAssociated", "The genre is already associated with the content");
    public static invalidPopularity: DomainException = new DomainException("Content.invalidPopularity", "The popularity must be a number between 0 and 100");
    public static genreNotFound: DomainException = new DomainException("Content.genreNotFound", "The genre was not found");
}