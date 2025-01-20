import { Router } from "express";
import { ArticleController } from "../controllers/ArticleController";
import { ArticleService } from "../services/ArticleService";
import { ArticleRepository } from "../repositories/ArticleRepository";
import { AppDataSource } from "../utils/data-source";
import { Article } from "../entities/Article";
import { validation } from "../middlewares/Validation";
import { ArticleCreateDto } from "../dtos/article/ArticleCreateDto";

export const articleRouter = Router();
const articleController = new ArticleController(
  new ArticleService(
    new ArticleRepository(AppDataSource.getRepository(Article))
  )
);

articleRouter.get("/", articleController.getArticles);
articleRouter.post(
  "/",
  validation(ArticleCreateDto),
  articleController.addArticle
);
