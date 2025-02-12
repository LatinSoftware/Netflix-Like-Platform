import { Command, CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Genre } from '../../Entities/genre.entity';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

export class GenreDeleteCommand extends Command<boolean> {
  constructor(public readonly id: number) {
    super();
  }
}

@CommandHandler(GenreDeleteCommand)
export class GenreDeleteCommandHandler implements ICommandHandler<GenreDeleteCommand> {

    constructor(@InjectRepository(Genre) private readonly repository: Repository<Genre>) {}

  async execute(command: GenreDeleteCommand): Promise<boolean> {
    const result = await this.repository.delete(command.id);
    return result.affected != null && result.affected > 0;
  }
}