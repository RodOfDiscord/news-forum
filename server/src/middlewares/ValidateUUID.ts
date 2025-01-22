import { Request, Response, NextFunction } from "express";
import { isUUID } from "class-validator";
import { ApiError } from "../utils/errors/ApiError";

export const validateUUID = (paramName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = req.params[paramName];
    if (!isUUID(id)) {
      throw ApiError.BadRequest("Invalid UUID format", [
        { field: paramName, message: "Must be a valid UUID" },
      ]);
    }
    next();
  };
};
