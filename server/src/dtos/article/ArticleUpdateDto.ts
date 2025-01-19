import { IsString, IsOptional, IsUUID } from "class-validator";

export class ArticleUpdateDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsUUID()
  @IsOptional()
  category_id?: string;
}
