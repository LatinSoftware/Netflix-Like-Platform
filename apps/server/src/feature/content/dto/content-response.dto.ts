import { Expose } from "class-transformer";
import { Category } from "src/Entities/category.entity";
import { Genre } from "src/Entities/genre.entity";

export class ContentResponse {
  @Expose() id: number;
  @Expose() title: string;
  @Expose() description: string;
  @Expose() releaseDate: Date;
  @Expose() duration: number;
  @Expose() ageRating: number;
  @Expose() originalLanguage: string;
  @Expose() popularity: number;
  @Expose() category: Category;
  @Expose() genres: Genre[];
}
