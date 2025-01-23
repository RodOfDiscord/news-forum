import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { UserService } from "../services/UserService";
import { User } from "../entities/User";
import { AppDataSource } from "../utils/data-source";
import { UserRepository } from "../repositories/UserRepository";
import { TokenService } from "../services/TokenService";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository";
import { RefreshToken } from "../entities/RefreshToken";
import { UserCreateDto } from "../dtos/user/UserCreateDto";
import { validation } from "../middlewares/Validation";

export const authRouter = Router();
const tokenService = new TokenService(
  new RefreshTokenRepository(AppDataSource.getRepository(RefreshToken))
);
const authController = new AuthController(
  new UserService(
    new UserRepository(AppDataSource.getRepository(User)),
    tokenService
  )
);

authRouter.post("/login", authController.login);
authRouter.post(
  "/register",
  validation(UserCreateDto),
  authController.register
);

authRouter.get("/refresh-token", authController.refreshToken);
