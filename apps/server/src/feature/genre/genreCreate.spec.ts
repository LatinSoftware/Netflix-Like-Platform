import { Test, TestingModule } from '@nestjs/testing';
import { GenreCreateCommandHandler } from './genreCreate';
import { GenreCreateCommand } from './genreCreate';
import { Genre } from 'src/Entities/genre.entity';
import { Repository } from 'typeorm';


describe('GenreCreateCommandHandler', () => {
    let commandHandler: GenreCreateCommandHandler;
    let repository: Repository<Genre>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GenreCreateCommandHandler, {
                provide: Repository<Genre>,
                useValue: {
                    save: jest.fn(),
                    existsBy: jest.fn(),
                },
            }],
        }).compile();

        commandHandler = module.get<GenreCreateCommandHandler>(GenreCreateCommandHandler);
        repository = module.get<Repository<Genre>>(Repository);
    });

    it('should be defined', () => {
        expect(commandHandler).toBeDefined();
    });

    it('should successfully create a genre', async () => {
        const command = new GenreCreateCommand('Action', 'Action and adventure');
    
        const mockGenre = Genre.create("Action", "Action and adventure");	
        mockGenre.id = 1;
        
        (repository.save as jest.Mock).mockResolvedValue(mockGenre);
    
        const result = await commandHandler.execute(command);
    
        expect(repository.save).toHaveBeenCalledWith(expect.objectContaining({
          name: 'Action',
          description: 'Action and adventure',
        }));
        expect(result).toEqual(mockGenre);
      });
   
});