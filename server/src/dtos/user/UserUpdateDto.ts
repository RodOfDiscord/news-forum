import {
  IsEmail,
  IsStrongPassword,
  MinLength,
  MaxLength,
  IsOptional,
} from "class-validator";

export class UserUpdateDto {
  @MinLength(5)
  @MaxLength(26)
  @IsOptional()
  username?: string;

  @MinLength(5)
  @MaxLength(26)
  @IsOptional()
  login?: string;

  @IsStrongPassword({
    minLength: 8,
    minSymbols: 1,
    minNumbers: 1,
    minUppercase: 0,
    minLowercase: 0,
  })
  @MaxLength(16)
  @IsOptional()
  password?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
