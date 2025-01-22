import { Repository } from "typeorm";
import { Role } from "../entities/Role";
import { ApiError } from "../utils/errors/ApiError";
import { RoleCreateDto } from "../dtos/role/RoleCreateDto";
import { InsertResult } from "typeorm/browser";
import { RoleUpdateDto } from "../dtos/role/RoleUpdateDto";

export class RoleRepository {
  constructor(private readonly roleRepository: Repository<Role>) {}

  async getAll() {
    return await this.roleRepository.find();
  }

  async get(id: string) {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) throw ApiError.NotFound("role not found");
    return role;
  }

  async add(roleCreateDto: RoleCreateDto): Promise<InsertResult> {
    const role = this.roleRepository.create(roleCreateDto);
    return await this.roleRepository.insert(role);
  }

  async update(id: string, roleUpdateDto: RoleUpdateDto) {
    const result = await this.roleRepository.update(id, roleUpdateDto);
    if (result.affected === 0) throw ApiError.NotFound("Role not found");
    const updatedRole = await this.roleRepository.findOne({
      where: { id },
    });
    return updatedRole!;
  }

  async delete(id: string) {
    const result = await this.roleRepository.delete(id);
    if (result.affected === 0) throw ApiError.NotFound("Role not found");
  }
}
