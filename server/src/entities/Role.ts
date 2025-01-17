import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./User";

@Entity({ name: "roles" })
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  Name: string;

  @OneToMany(() => User, (user) => user.role, { onDelete: "SET NULL" })
  users: User[];
}
