import {
  IsEmail,
  IsStrongPassword,
  MinLength,
  MaxLength,
} from "class-validator";

export class UserCreateDto {
  @MinLength(6)
  @MaxLength(26)
  username: string;

  @MinLength(6)
  @MaxLength(26)
  login: string;

  @IsStrongPassword({
    minLength: 8,
    minSymbols: 1,
    minNumbers: 1,
    minUppercase: 0,
    minLowercase: 0,
  })
  @MaxLength(16)
  password: string;

  @IsEmail()
  email: string;
}
