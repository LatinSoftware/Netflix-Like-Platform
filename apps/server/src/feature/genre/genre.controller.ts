import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GenreCreateCommand } from './genreCreate';
import { GenreDeleteCommand, GenreGetQuery } from '.';
import { GenreUpdateCommand } from './genreUpdate';


@Controller('genre')
export class GenreController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Get()
  get(@Query('name') name?: string){

    console.log({name})
    return this.queryBus.execute(new GenreGetQuery(name));
  }

  @Post()
  create(@Body() createGenreDto: GenreCreateCommand) {
    console.log("createGenreDto", createGenreDto);
    return this.commandBus.execute(new GenreCreateCommand(createGenreDto.name, createGenreDto.description));
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateGenreDto: GenreUpdateCommand) {
    console.log("updateGenreDto", updateGenreDto);
    return this.commandBus.execute(new GenreUpdateCommand(id, updateGenreDto.name, updateGenreDto.description));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.commandBus.execute(new GenreDeleteCommand(id));
  }
}
