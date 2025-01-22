import { UserService } from "../services/UserService";
import { NextFunction, Request, Response } from "express";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  getUsers = async (_: Request, res: Response): Promise<void> => {
    const users = await this.userService.getAll();
    res.status(200).json(users);
    return;
  };

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const user = await this.userService.get(id);
      res.status(201).json(user);
      return;
    } catch (e) {
      next(e);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const updatedUser = await this.userService.update(id, req.body);
      res.status(200).json(updatedUser);
      return;
    } catch (e) {
      next(e);
    }
  };
}
