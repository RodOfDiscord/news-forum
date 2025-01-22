import { Repository } from "typeorm";
import { Category } from "../entities/Category";
import { InsertResult } from "typeorm/browser";
import { CategoryCreateDto } from "../dtos/category/CategoryCreateDto";
import { CategoryUpdateDto } from "../dtos/category/CategoryUpdateDto";
import { ApiError } from "../utils/errors/ApiError";
export class CategoryRepository {
  constructor(private readonly categoryRepository: Repository<Category>) {}

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository.find({ relations: ["articles"] });
  }

  async get(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ["articles"],
    });
    if (!category) throw ApiError.NotFound("Category not found");
    return category;
  }

  async add(categoryCreateDto: CategoryCreateDto): Promise<InsertResult> {
    const newCategory = this.categoryRepository.create(categoryCreateDto);
    return await this.categoryRepository.insert(newCategory);
  }

  async update(
    id: string,
    categoryUpdateDto: CategoryUpdateDto
  ): Promise<Category> {
    const result = await this.categoryRepository.update(id, categoryUpdateDto);
    if (result.affected === 0) throw ApiError.NotFound("Category not found");
    const updatedCategory = await this.categoryRepository.findOne({
      where: { id },
    });
    return updatedCategory!;
  }

  async delete(id: string): Promise<void> {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) throw ApiError.NotFound("Category not found");
  }
}
