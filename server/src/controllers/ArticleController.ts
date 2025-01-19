import { Request, Response } from "express";
import { ArticleService } from "../services/ArticleService";

export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  getArticles = async (_: Request, res: Response): Promise<void> => {
    const articles = await this.articleService.getAll();
    res.send(articles);
  };

  addArticle = async (req: Request, res: Response) => {
    const newArticle = await this.articleService.add(req.body);
    res.send(newArticle);
  };
}
