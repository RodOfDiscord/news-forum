import { validate } from "class-validator";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { NextFunction, RequestHandler } from "express";
import { Response, Request } from "express";

export function validation<T extends object>(
  dto: ClassConstructor<T>
): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dto, req.body);
    const errors = await validate(dtoInstance);
    if (errors.length > 0) {
      res.status(400).json({
        message: "Validation failed",
        errors: errors.map((err) => ({
          property: err.property,
          constraints: err.constraints,
        })),
      });
    }
    next();
  };
}
