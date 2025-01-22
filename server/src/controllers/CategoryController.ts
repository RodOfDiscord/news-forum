import { CategoryService } from "../services/CategoryService";
import { NextFunction, Request, Response } from "express";

export class CategoryController {
  private categoryService: CategoryService;

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService;
  }

  getCategories = async (_: Request, res: Response): Promise<void> => {
    const categories = await this.categoryService.getAll();
    res.status(200).json(categories);
    return;
  };

  getCategoryById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
    try {
      const category = await this.categoryService.getById(id);
      res.status(200).json(category);
      return;
    } catch (e) {
      next(e);
    }
  };

  addCategory = async (req: Request, res: Response): Promise<void> => {
    const categoryData = req.body;
    const newCategory = await this.categoryService.add(categoryData);
    res.status(201).json(newCategory);
    return;
  };

  updateCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
    try {
      const categoryData = req.body;
      const updatedCategory = await this.categoryService.update(
        id,
        categoryData
      );
      res.status(200).json(updatedCategory);
      return;
    } catch (e) {
      next(e);
    }
  };

  deleteCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
    try {
      await this.categoryService.delete(id);
      res.status(204).send();
      return;
    } catch (e) {
      next(e);
    }
  };
}
