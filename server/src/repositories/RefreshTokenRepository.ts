import { Repository } from "typeorm";
import { RefreshToken } from "../entities/RefreshToken";
import { RefreshTokenCreateDto } from "../dtos/refresh_token/RefreshTokenCreateDto";
import { RefreshTokenUpdateDto } from "../dtos/refresh_token/RefreshTokenUpdateDto";
import { ApiError } from "../utils/errors/ApiError";

export class RefreshTokenRepository {
  constructor(private readonly tokenRepository: Repository<RefreshToken>) {}

  async getAll() {
    return await this.tokenRepository.find();
  }

  async get(id: string) {
    const token = await this.tokenRepository.findOne({ where: { id } });
    if (!token) throw ApiError.NotFound("Token not found");
    return token;
  }

  async add(tokenDto: RefreshTokenCreateDto) {
    const token = this.tokenRepository.create(tokenDto);
    const id = (await this.tokenRepository.insert(token)).generatedMaps[0].id;
    return await this.get(id);
  }

  async update(id: string, tokenDto: RefreshTokenUpdateDto) {
    const result = await this.tokenRepository.update(id, tokenDto);
    if (result.affected === 0) throw ApiError.NotFound("Token not found");
    return await this.get(id);
  }

  async deleteByToken(token: string) {
    const result = await this.tokenRepository.delete({ token: token });
    if (result.affected === 0) throw ApiError.NotFound("Token not found");
  }

  async getByUserId(userId: string) {
    const token = await this.tokenRepository.findOne({
      where: { user: { id: userId } },
      relations: ["user"],
    });
    if (!token) throw ApiError.NotFound("Token not found");
    return token;
  }

  async getByToken(refreshToken: string) {
    const token = await this.tokenRepository.findOne({
      where: { token: refreshToken },
      relations: ["user"],
    });
    if (!token) throw ApiError.NotFound("Token not found");
    return token;
  }
}
