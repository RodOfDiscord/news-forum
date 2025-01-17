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
}