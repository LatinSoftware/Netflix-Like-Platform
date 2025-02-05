import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommandBus, ICommandBus, IQueryBus } from '@nestjs/cqrs';
import { GenreCreateCommand } from './genreCreate';

@Controller('genre')
export class GenreController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  create(@Body() createGenreDto: GenreCreateCommand) {

    console.log("createGenreDto", createGenreDto);
    return this.commandBus.execute(new GenreCreateCommand(createGenreDto.name, createGenreDto.description));
  }

 
}
