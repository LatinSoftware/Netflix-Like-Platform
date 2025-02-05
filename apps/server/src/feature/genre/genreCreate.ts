import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { Genre } from 'src/Entities/genre.entity';
import { Repository } from 'typeorm';

export class GenreCreateDto{
  @IsString()
  @MaxLength(100)
  name: string;
  @IsOptional()
  @MaxLength(500)
  description?: string;
}

export class GenreCreateResponse {
  id: number;
  name: string;
  description: string;
}

export class GenreCreateCommand extends Command<GenreCreateResponse> {
  constructor(
    public readonly name: string,
    public readonly description?: string,
  ) {
    super();
  }
}

@CommandHandler(GenreCreateCommand)
export class GenreCreateCommandHandler implements ICommandHandler<GenreCreateCommand> {
  constructor(@InjectRepository(Genre) private readonly genreRepository: Repository<Genre>) {}
  async execute(command: GenreCreateCommand): Promise<GenreCreateResponse> {
    const {name, description} = command;
    const existingGenre = await this.genreRepository.existsBy({name});
    if(existingGenre) {
      throw new Error('Genre already exists');
    }

    const genre = new Genre(name, description);
    await this.genreRepository.save(genre);
    return genre as GenreCreateResponse;
  }
}
