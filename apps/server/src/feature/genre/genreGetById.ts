import { IQueryHandler, Query, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Genre } from "src/Entities/genre.entity";
import { GenreError } from "src/Shared/Messages/Errors/genre.error";
import { Repository } from "typeorm";
import { GenreResponseDto } from "./genre-response.dto";



export class GenreGetByIdQuery extends Query<GenreResponseDto>{
    constructor(public readonly id: number){super()}
}

@QueryHandler(GenreGetByIdQuery)
export class GenreGetByIdQueryHandler implements IQueryHandler<GenreGetByIdQuery>{

    constructor(@InjectRepository(Genre) private readonly repository: Repository<Genre>) {}
    
    async execute(query: GenreGetByIdQuery): Promise<GenreResponseDto> {
        
        var genre = await this.repository.findOneBy({id: query.id})
        if(!genre)
            throw GenreError.genreNotFound

        return new GenreResponseDto(genre.id, genre.name, genre.description)
    }

}