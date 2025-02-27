import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ContentResponse } from './dto/content-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from 'src/Entities/content.entity';
import { Repository } from 'typeorm';
import { Genre } from 'src/Entities/genre.entity';
import { Category } from 'src/Entities/category.entity';
import { plainToInstance } from 'class-transformer';

export class ContentCreateCommand extends Command<ContentResponse> {
  title: string;
  description: string;
  releaseDate: Date;
  duration: number;
  originalLanguage: string;
  category_id: number;
  genre_ids: number[];

  constructor(
    title: string,
    description: string,
    releaseDate: Date,
    duration: number,
    originalLanguage: string,
    category_id: number,
    genre_ids: number[]
  ) {
    super();
    this.title = title;
    this.description = description;
    this.releaseDate = releaseDate;
    this.duration = duration;
    this.originalLanguage = originalLanguage;
    this.category_id = category_id;
    this.genre_ids = genre_ids;
  }
}

@CommandHandler(ContentCreateCommand)
export class ContentCreateCommandHandler
  implements ICommandHandler<ContentCreateCommand>
{
  constructor(
    @InjectRepository(Content) private readonly repository: Repository<Content>,
    @InjectRepository(Genre) private readonly genreRepository: Repository<Genre>,
    @InjectRepository(Genre) private readonly categoryRepository: Repository<Category>,
  ) {}

  async execute(command: ContentCreateCommand): Promise<ContentResponse> {
    // validate genre_ids

    const genrePromises = command.genre_ids.map((id) =>  this.validateGenreId(id));

    const genresArray = await Promise.all(genrePromises); 
    
    const genresValidationResult = genresArray.map((genre) => genre[0]);

    if(genresValidationResult.includes(false)) {
      throw new Error('Invalid genre id');
    }

    // validate category id

    const category = await this.validateCategoryId(command.category_id);
    if(!category[0]) {
      throw new Error('Invalid category id');
    }

    const genres = genresArray.map((genre) => genre[1]);
    const {title, description, releaseDate, duration, originalLanguage} = command;
    const content = Content.create(title, description, releaseDate, duration, 0, originalLanguage, category[1], genres);

    await this.repository.save(content);

    return plainToInstance(ContentResponse, content, { excludeExtraneousValues: true });
  }

  private async validateGenreId(genreId: number): Promise<[boolean, Genre]> {
    const genre = await this.genreRepository.findOneBy({id: genreId});
    if(genre == null) return [false, new Genre("", "")];
    return [true, genre];
  }

  private async validateCategoryId(categoryId: number): Promise<[boolean, Category]> {
    const category = await this.categoryRepository.findOneBy({id: categoryId});
    if(category == null) return [false, new Category()];
    return [true, category];
  }

}
