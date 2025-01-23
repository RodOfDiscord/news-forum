import { Router } from "express";
import { ArticleController } from "../controllers/ArticleController";
import { ArticleService } from "../services/ArticleService";
import { ArticleRepository } from "../repositories/ArticleRepository";
import { AppDataSource } from "../utils/data-source";
import { Article } from "../entities/Article";
import { validation } from "../middlewares/Validation";
import { ArticleCreateDto } from "../dtos/article/ArticleCreateDto";
import { checkAuth } from "../middlewares/Auth";
import { TokenService } from "../services/TokenService";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository";
import { RefreshToken } from "../entities/RefreshToken";

const tokenService = new TokenService(
  new RefreshTokenRepository(AppDataSource.getRepository(RefreshToken))
);
export const articleRouter = Router();
const articleController = new ArticleController(
  new ArticleService(
    new ArticleRepository(AppDataSource.getRepository(Article))
  )
);

articleRouter.get("/", articleController.getArticles);
articleRouter.post(
  "/",
  checkAuth(tokenService),
  validation(ArticleCreateDto),
  articleController.addArticle
);
