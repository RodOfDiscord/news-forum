import { Repository } from "typeorm";
import { Category } from "../entities/Category";
import { InsertResult } from "typeorm/browser";
import { UpdateResult } from "typeorm/browser";
import { CategoryCreateDto } from "../dtos/category/CategoryCreateDto";
import { CategoryUpdateDto } from "../dtos/category/CategoryUpdateDto";

export class CategoryRepository {
  constructor(private readonly categoryRepository: Repository<Category>) {}

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository.find({ relations: ["articles"] });
  }

  async get(id: string): Promise<Category | null> {
    return await this.categoryRepository.findOne({
      where: { id },
      relations: ["articles"],
    });
  }

  async add(categoryCreateDto: CategoryCreateDto): Promise<InsertResult> {
    const newCategory = this.categoryRepository.create(categoryCreateDto);
    return await this.categoryRepository.insert(newCategory);
  }

  async update(
    id: string,
    categoryUpdateDto: CategoryUpdateDto
  ): Promise<UpdateResult> {
    return await this.categoryRepository.update(id, categoryUpdateDto);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.categoryRepository.delete(id);
    return result.affected !== 0;
  }
}
