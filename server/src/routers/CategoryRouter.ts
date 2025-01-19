import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
import { CategoryService } from "../services/CategoryService";
import { CategoryRepository } from "../repositories/CategoryRepository";
import { AppDataSource } from "../utils/data-source";
import { Category } from "../entities/Category";
import { validation } from "../middlewares/Validation";
import { CategoryCreateDto } from "../dtos/category/CategoryCreateDto";

export const categoryRouter = Router();
const categoryController = new CategoryController(
  new CategoryService(
    new CategoryRepository(AppDataSource.getRepository(Category))
  )
);
categoryRouter.get("/", categoryController.getCategories);
categoryRouter.post(
  "/",
  validation(CategoryCreateDto),
  categoryController.createCategory
);
