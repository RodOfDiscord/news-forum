import { UserService } from "../services/UserService";
import { Request, Response } from "express";

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
}
