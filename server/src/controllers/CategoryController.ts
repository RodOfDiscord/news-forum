import { CategoryService } from "../services/CategoryService";
import { Request, Response } from "express";

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

  getCategoryById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const category = await this.categoryService.getById(id);
    res.status(200).json(category);
    return;
  };

  createCategory = async (req: Request, res: Response): Promise<void> => {
    const categoryData = req.body;
    const newCategory = await this.categoryService.add(categoryData);
    res.status(201).json(newCategory);
    return;
  };

  updateCategory = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const categoryData = req.body;
    const updatedCategory = await this.categoryService.update(id, categoryData);
    res.status(200).json(updatedCategory);
    return;
  };

  deleteCategory = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await this.categoryService.delete(id);
    res.status(204).send();
    return;
  };
}
