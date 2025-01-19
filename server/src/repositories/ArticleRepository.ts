import { InsertResult, Repository } from "typeorm";
import { Article } from "../entities/Article";
import { ArticleUpdateDto } from "../dtos/article/ArticleUpdateDto";
import { UpdateResult } from "typeorm/browser";
import { ArticleCreateDto } from "../dtos/article/ArticleCreateDto";

export class ArticleRepository {
  constructor(private readonly articleRepository: Repository<Article>) {}

  async getAll() {
    return await this.articleRepository.find();
  }

  async get(id: string): Promise<Article | null> {
    return await this.articleRepository.findOne({
      where: { id },
      relations: ["category"],
    });
  }

  async update(
    id: string,
    articleDto: ArticleUpdateDto
  ): Promise<UpdateResult> {
    return await this.articleRepository.update(id, articleDto);
  }

  async add(articleDto: ArticleCreateDto): Promise<InsertResult> {
    const newArticle = this.articleRepository.create(articleDto);
    return await this.articleRepository.insert(newArticle);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.articleRepository.delete(id);
    return result.affected !== 0;
  }
}
