import { IsString, MinLength, MaxLength, IsOptional } from "class-validator";

export class RoleUpdateDto {
  @MinLength(1)
  @MaxLength(12)
  @IsString()
  @IsOptional()
  name?: string;
}
