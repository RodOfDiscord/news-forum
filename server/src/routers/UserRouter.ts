import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { AppDataSource } from "../utils/data-source";
import { User } from "../entities/User";
import { UserService } from "../services/UserService";
import { UserRepository } from "../repositories/UserRepository";
import { validateUUID } from "../middlewares/ValidateUUID";
import { validation } from "../middlewares/Validation";
import { UserUpdateDto } from "../dtos/user/UserUpdateDto";
import { UserCreateDto } from "../dtos/user/UserCreateDto";
import { TokenService } from "../services/TokenService";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository";
import { RefreshToken } from "../entities/RefreshToken";

export const userRouter = Router();

const tokenService = new TokenService(
  new RefreshTokenRepository(AppDataSource.getRepository(RefreshToken))
);

const userController = new UserController(
  new UserService(
    new UserRepository(AppDataSource.getRepository(User)),
    tokenService
  )
);

userRouter.get("/", userController.getUsers);
userRouter.get("/:id", validateUUID("id"), userController.getUserById);
userRouter.put(
  "/:id",
  validateUUID("id"),
  validation(UserUpdateDto),
  userController.updateUser
);
userRouter.post("/", validation(UserCreateDto), userController.addUser);
