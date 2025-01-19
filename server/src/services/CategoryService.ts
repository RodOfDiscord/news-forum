import { CategoryRepository } from "../repositories/CategoryRepository";
import { CategoryCreateDto } from "../dtos/category/CategoryCreateDto";
import { CategoryUpdateDto } from "../dtos/category/CategoryUpdateDto";
import { Category } from "../entities/Category";

export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getAll(): Promise<Category[]> {
    return await this.categoryRepository.getAll();
  }

  async getById(id: string): Promise<Category | null> {
    const category = await this.categoryRepository.get(id);
    return category;
  }

  async add(categoryCreateDto: CategoryCreateDto) {
    return await this.categoryRepository.add(categoryCreateDto);
  }

  async update(id: string, categoryUpdateDto: CategoryUpdateDto) {
    return await this.categoryRepository.update(id, categoryUpdateDto);
  }

  async delete(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
