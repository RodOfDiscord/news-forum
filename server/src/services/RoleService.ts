import { RoleCreateDto } from "../dtos/role/RoleCreateDto";
import { RoleUpdateDto } from "../dtos/role/RoleUpdateDto";
import { Role } from "../entities/Role";
import { RoleRepository } from "../repositories/RoleRepository";

export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async getAll(): Promise<Role[]> {
    return await this.roleRepository.getAll();
  }

  async add(roleCreateDto: RoleCreateDto): Promise<Role> {
    const result = await this.roleRepository.add(roleCreateDto);
    return await this.roleRepository.get(result.identifiers[0].id);
  }

  async get(id: string): Promise<Role> {
    return await this.roleRepository.get(id);
  }

  async update(id: string, roleUpdateDto: RoleUpdateDto): Promise<Role> {
    return await this.roleRepository.update(id, roleUpdateDto);
  }

  async delete(id: string): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
