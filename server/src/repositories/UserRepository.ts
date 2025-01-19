import { Repository, UpdateResult } from "typeorm";
import { User } from "../entities/User";
import { UserCreateDto } from "../dtos/user/UserCreateDto";

export class UserRepository {
  constructor(private readonly userRepository: Repository<User>) {}

  async getUsers() {
    return await this.userRepository.find();
  }

  async add(user: UserCreateDto) {
    const newUser = this.userRepository.create(user);
    await this.userRepository.insert(newUser);
  }

  async update(id: number, user: Partial<User>): Promise<UpdateResult> {
    return await this.userRepository.update(id, user);
  }

  async get(id: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ["role", "articles"],
    });
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete({ id });
  }
}
