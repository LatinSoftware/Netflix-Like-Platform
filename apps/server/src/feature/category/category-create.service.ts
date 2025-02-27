import { Command, CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import CategoryResponse from "./dto/category-response.dto";
import { Repository } from "typeorm";
import { Category } from "src/Entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";

export class CategoryCreateCommand extends Command<CategoryResponse> {
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}

@CommandHandler(CategoryCreateCommand)
export class CategoryCreateCommandHandler  implements ICommandHandler<CategoryCreateCommand> {
  constructor(
    @InjectRepository(Category) private readonly repository: Repository<Category>,
  ) {}

  async execute(command: CategoryCreateCommand): Promise<CategoryResponse> {
    const category = plainToInstance(Category, command);
    const result = await this.repository.save(category);
    return plainToInstance(CategoryResponse, result);
  }
}