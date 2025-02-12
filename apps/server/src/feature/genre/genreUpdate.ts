import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from 'src/Entities/genre.entity';
import { GenreError } from 'src/Shared/Messages/Errors/genre.error';
import { Repository } from 'typeorm';

export class GenreUpdateCommand extends Command<boolean> {
  constructor(
    public readonly id: number,
    public readonly name?: string,
    public readonly description?: string,
  ) {
    super();
  }
}

@CommandHandler(GenreUpdateCommand)
export class GenreUpdateCommandHandler
  implements ICommandHandler<GenreUpdateCommand>
{
  constructor(
    @InjectRepository(Genre) private readonly repository: Repository<Genre>,
  ) {}

  async execute({name, description, id}: GenreUpdateCommand): Promise<boolean> {
    const genre = await this.repository.findOneBy({id})
    if(!genre) throw GenreError.genreNotFound

    if(name)
        genre.name = name

    if(description)
        genre.description = description

    await this.repository.save(genre)

    return true

  }
}
