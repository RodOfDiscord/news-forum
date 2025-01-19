import { IsString, IsOptional, MinLength, MaxLength } from "class-validator";

export class CategoryUpdateDto {
  @IsOptional()
  @MinLength(1)
  @MaxLength(26)
  @IsString()
  name?: string;
}
