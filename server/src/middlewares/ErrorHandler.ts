import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/errors/ApiError";

export function handleError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    res
      .status(err.statusCode)
      .json({ message: err.message, errors: err.errorMessages });
    return;
  }
  res.status(500).json({ message: "Unexpected error" });
  return;
}
