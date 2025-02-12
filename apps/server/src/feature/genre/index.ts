import { GenreCreateCommandHandler, GenreCreateCommand } from './genreCreate';
import { GenreGetQueryHandler, GenreGetQuery } from './genreGet';
import { GenreGetByIdQuery, GenreGetByIdQueryHandler } from './genreGetById';
import { GenreDeleteCommand, GenreDeleteCommandHandler } from './genreDelete';
import { GenreUpdateCommand, GenreUpdateCommandHandler } from './genreUpdate';

export {
  GenreCreateCommand,
  GenreCreateCommandHandler,
  GenreGetQuery,
  GenreGetQueryHandler,
  GenreGetByIdQuery,
  GenreGetByIdQueryHandler,
  GenreDeleteCommand,
  GenreDeleteCommandHandler,
  GenreUpdateCommand,
  GenreUpdateCommandHandler
};

export const Handlers = [
  GenreCreateCommandHandler,
  GenreGetQueryHandler,
  GenreGetByIdQueryHandler,
  GenreDeleteCommandHandler,
  GenreUpdateCommandHandler
];
