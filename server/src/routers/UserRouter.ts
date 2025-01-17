import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { AppDataSource } from '../utils/data-source';
import { User } from '../entities/User';
import { UserService } from '../services/UserService';
import { UserRepository } from '../repositories/UserRepository';

export const userRouter = Router();

const userController = new UserController(new UserService(new UserRepository(AppDataSource.getRepository(User))))


userRouter.get("/", userController.getUsers);