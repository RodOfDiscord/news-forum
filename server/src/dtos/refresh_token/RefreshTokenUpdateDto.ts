import { IsOptional, IsUUID } from "class-validator";

export class RefreshTokenUpdateDto {
  @IsOptional()
  token?: string;

  @IsOptional()
  @IsUUID()
  user_id?: string;

  @IsOptional()
  expiresIn?: number;
}
