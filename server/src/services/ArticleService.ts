import { InsertResult } from "typeorm";
import { ArticleCreateDto } from "../dtos/article/ArticleCreateDto";
import { Article } from "../entities/Article";
import { ArticleRepository } from "../repositories/ArticleRepository";

export class ArticleService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async getAll(): Promise<Article[]> {
    return await this.articleRepository.getAll();
  }

  async add(articleDto: ArticleCreateDto): Promise<InsertResult> {
    return await this.articleRepository.add(articleDto);
  }

  async get(id: string): Promise<Article | null> {
    return await this.articleRepository.get(id);
  }

  async delete(id: string) {
    return await this.articleRepository.delete(id);
  }
}
