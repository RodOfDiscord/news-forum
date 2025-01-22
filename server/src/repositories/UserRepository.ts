import { Repository } from "typeorm";
import { User } from "../entities/User";
import { UserCreateDto } from "../dtos/user/UserCreateDto";
import { UserUpdateDto } from "../dtos/user/UserUpdateDto";
import { ApiError } from "../utils/errors/ApiError";

export class UserRepository {
  constructor(private readonly userRepository: Repository<User>) {}

  async getUsers() {
    return await this.userRepository.find();
  }

  async add(user: UserCreateDto) {
    const newUser = this.userRepository.create(user);
    await this.userRepository.insert(newUser);
  }

  async update(id: string, userUpdateDto: UserUpdateDto): Promise<User> {
    const result = await this.userRepository.update(id, userUpdateDto);
    if (result.affected === 0) throw ApiError.NotFound("User not found");
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    return updatedUser!;
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
