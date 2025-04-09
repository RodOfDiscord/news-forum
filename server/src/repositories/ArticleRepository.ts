import { Repository } from "typeorm";
import { Article } from "../entities/Article";
import { ArticleUpdateDto } from "../dtos/article/ArticleUpdateDto";
import { ArticleCreateDto } from "../dtos/article/ArticleCreateDto";
import { ApiError } from "../utils/errors/ApiError";

export class ArticleRepository {
  constructor(private readonly articleRepository: Repository<Article>) {}

  async getAll() {
    return await this.articleRepository.find();
  }

  async get(id: string): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ["category"],
    });
    if (!article) throw ApiError.NotFound("Article not found");
    return article;
  }

  async update(id: string, articleDto: ArticleUpdateDto): Promise<boolean> {
    const result = await this.articleRepository.update(id, articleDto);
    if (result.affected === 0) throw ApiError.NotFound("Category not found");
    return result.affected !== 0;
  }

  async add(articleDto: ArticleCreateDto): Promise<Article | null> {
    const newArticle = this.articleRepository.create(articleDto);
    const id = (await this.articleRepository.insert(newArticle))
      .generatedMaps[0].id;
    return await this.articleRepository.findOne({ where: { id } });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.articleRepository.delete(id);
    if (result.affected === 0) throw ApiError.NotFound("Category not found");
    return result.affected !== 0;
  }
}
