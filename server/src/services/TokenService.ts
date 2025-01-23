import { sign, verify } from "jsonwebtoken";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository";
import { UserPayloadDto } from "../dtos/user/UserPayloadDto";
import { RefreshTokenCreateDto } from "../dtos/refresh_token/RefreshTokenCreateDto";

export class TokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository
  ) {}

  async removeByToken(token: string) {
    this.refreshTokenRepository.deleteByToken(token);
  }

  async createRefreshToken(userPayload: UserPayloadDto) {
    const token = sign(userPayload, String(process.env.REFRESH_TOKEN_SECRET), {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    });
    const tokenDto = new RefreshTokenCreateDto();
    tokenDto.token = token;
    tokenDto.user_id = userPayload.id;
    tokenDto.expiresIn = Number(process.env.REFRESH_TOKEN_EXPIRATION);
    await this.refreshTokenRepository.add(tokenDto);
    return token;
  }

  generateAccessToken(userPayload: UserPayloadDto) {
    const token = sign(userPayload, String(process.env.ACCESS_TOKEN_SECRET), {
      expiresIn: "15m",
    });
    return token;
  }

  verifyRefreshToken(token: string) {
    try {
      return verify(
        token,
        process.env.REFRESH_TOKEN_SECRET as string
      ) as UserPayloadDto;
    } catch (e) {
      return null;
    }
  }

  verifyAccessToken(token: string) {
    try {
      return verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string
      ) as UserPayloadDto;
    } catch (e) {
      return null;
    }
  }

  async getByUserId(userId: string) {
    return await this.refreshTokenRepository.getByUserId(userId);
  }

  async getByToken(refreshToken: string) {
    return await this.refreshTokenRepository.getByToken(refreshToken);
  }

  async delete(token: string) {
    return await this.refreshTokenRepository.deleteByToken(token);
  }
}
