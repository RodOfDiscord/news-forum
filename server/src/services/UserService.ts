import { UserUpdateDto } from "../dtos/user/UserUpdateDto";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.getUsers();
  }

  async delete(id: string) {
    await this.userRepository.delete(id);
  }

  async get(id: string) {
    return await this.userRepository.get(id);
  }

  async update(id: string, userUpdateDto: UserUpdateDto) {
    return await this.userRepository.update(id, userUpdateDto);
  }
}
