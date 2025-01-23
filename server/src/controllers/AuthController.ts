import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";

export class AuthController {
  constructor(private readonly userService: UserService) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken, accessToken } = await this.userService.login(
        req.body.email,
        req.body.password
      );
      res.cookie("refreshToken", refreshToken, {
        maxAge: Number(process.env.REFRESH_TOKEN_EXPIRATION),
        httpOnly: true,
        sameSite: false,
      });
      res.status(200).json({ refreshToken, accessToken });
    } catch (e) {
      next(e);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.userService.add(req.body);
    } catch (e) {
      next(e);
    }
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["refreshToken"];
    try {
      const { refreshToken, accessToken } = await this.userService.refresh(
        token
      );
      res.cookie("refreshToken", refreshToken, {
        maxAge: Number(process.env.REFRESH_TOKEN_EXPIRATION),
        httpOnly: true,
        sameSite: false,
      });
      res.send({ refreshToken, accessToken });
    } catch (e) {
      next(e);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies["refreshToken"];
      await this.userService.logout(token);
      res.clearCookie("refreshToken");
      res.status(200);
      return;
    } catch (e) {
      next(e);
    }
  };
}
