import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category";
import { User } from "./User";

@Entity({ name: "articles" })
export class Article {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column("text")
  content: string;

  @ManyToOne(() => Category, (category) => category.articles)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn({ name: "user_id" })
  user: User;
}
