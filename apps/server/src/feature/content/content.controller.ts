import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UpdateContentDto } from './dto/update-content.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ContentCreateCommand } from './content-create';
import { CreateContentDto } from './dto/create-content.dto';




@Controller('content')
export class ContentController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  create(@Body() createCommand: CreateContentDto) {

    console.log({createCommand});
   return this.commandBus.execute(new ContentCreateCommand(createCommand.title, createCommand.description, createCommand.releaseDate, createCommand.duration, createCommand.originalLanguage, createCommand.category_id, createCommand.genre_ids));
  }

  @Get()
  findAll() {
   
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
   
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    
  }
}
