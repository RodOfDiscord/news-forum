import { UserService } from "../services/UserService";
import { Request, Response } from 'express';

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService
    }

    getUsers = async (_: Request, res: Response): Promise<void> => {
        try {
            const users = await this.userService.getAll();
            res.status(200).json(users);
            return;
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ error: "Failed to fetch users" });
            return;
        }
    };
}