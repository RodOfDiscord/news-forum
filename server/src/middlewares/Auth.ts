import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/errors/ApiError";
import { TokenService } from "../services/TokenService";

export const checkAuth = (tokenService: TokenService) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      next(ApiError.Unauthorized("Access token is missing"));
      return;
    }
    const userPayload = tokenService.verifyAccessToken(accessToken!);
    if (!userPayload) {
      next(ApiError.Forbidden("Access token is invalid or expired"));
      return;
    }
    next();
  };
};
