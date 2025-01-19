import { IsString, IsNotEmpty, IsUUID } from "class-validator";

export class ArticleCreateDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUUID()
  @IsNotEmpty()
  category_id: string;
}
