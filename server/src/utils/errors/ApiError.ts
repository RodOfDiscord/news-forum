import { ErrorMessage } from "../types/ErrorMessage";

export class ApiError extends Error {
  readonly statusCode: number;
  readonly errorMessages?: ErrorMessage[];
  constructor(
    message: string,
    statusCode: number,
    errorMessages?: ErrorMessage[]
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorMessages = errorMessages || [];
  }

  static BadRequest(message: string, errorMessages?: ErrorMessage[]) {
    return new ApiError(message, 400, errorMessages);
  }
  static Unauthorized(message: string, errorMessages?: ErrorMessage[]) {
    return new ApiError(message, 401, errorMessages);
  }
  static Forbidden(message: string, errorMessages?: ErrorMessage[]) {
    return new ApiError(message, 403, errorMessages);
  }
  static NotFound(message: string, errorMessages?: ErrorMessage[]) {
    return new ApiError(message, 404, errorMessages);
  }
  static Conflict(message: string, errorMessages?: ErrorMessage[]) {
    return new ApiError(message, 409, errorMessages);
  }
}
