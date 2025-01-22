import { validate } from "class-validator";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { NextFunction, RequestHandler } from "express";
import { Response, Request } from "express";
import { ApiError } from "../utils/errors/ApiError";
import { ErrorMessage } from "../utils/types/ErrorMessage";

export function validation<T extends object>(
  dto: ClassConstructor<T>
): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dto, req.body);
    const errors = await validate(dtoInstance);
    if (!Object.keys(req.body).length) {
      next(ApiError.BadRequest("Request body cannot be empty"));
    }
    if (errors.length > 0) {
      const messages: ErrorMessage[] = errors.flatMap((error) =>
        Object.entries(error.constraints || {}).map(([_, message]) => ({
          field: error.property,
          message,
        }))
      );

      next(ApiError.BadRequest("Validation failed", messages));
    } else next();
  };
}
