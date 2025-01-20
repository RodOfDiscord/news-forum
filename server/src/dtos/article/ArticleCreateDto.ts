import { IsString, IsNotEmpty, IsUUID, Length } from "class-validator";
export class ArticleCreateDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 52)
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUUID()
  @IsNotEmpty()
  category_id: string;
}
