import { IQueryHandler, Query, QueryHandler } from "@nestjs/cqrs";
import { ILike, Repository } from 'typeorm';
import { Genre } from '../../Entities/genre.entity';
import { InjectRepository } from "@nestjs/typeorm";

class GenreGetResponse {
    id: number;
    name: string;
    description?: string
    
    constructor(id: number, name: string, description?: string){
        this.id = id;
        this.name = name;
        this.description = description;
    }
}


export class GenreGetQuery extends Query<GenreGetResponse[]> {
  constructor(public name?: string) {
    super();
  }
}

@QueryHandler(GenreGetQuery)
export class GenreGetQueryHandler implements IQueryHandler<GenreGetQuery> {

    constructor(@InjectRepository(Genre) private readonly repository: Repository<Genre>) {}

    async execute(query: GenreGetQuery): Promise<GenreGetResponse[]> {
        
        const genres = await this.repository.find({
            where: query.name ? { name: ILike(`%${query.name}%`) } : {},
        });

        return genres.map((genre) => new GenreGetResponse(genre.id, genre.name, genre.description));
    }
}