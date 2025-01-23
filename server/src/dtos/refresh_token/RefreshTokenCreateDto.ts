import { IsUUID } from "class-validator";

export class RefreshTokenCreateDto {
  token: string;

  @IsUUID()
  user_id: string;

  expiresIn: number;
}
