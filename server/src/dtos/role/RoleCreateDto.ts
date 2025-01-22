import { IsString, MinLength, MaxLength } from "class-validator";

export class RoleCreateDto {
  @MinLength(1)
  @MaxLength(12)
  @IsString()
  name: string;
}
