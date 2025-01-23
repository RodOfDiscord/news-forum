import { compare, hash } from "bcrypt";
import { UserCreateDto } from "../dtos/user/UserCreateDto";
import { UserUpdateDto } from "../dtos/user/UserUpdateDto";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { ApiError } from "../utils/errors/ApiError";
import { UserPayloadDto } from "../dtos/user/UserPayloadDto";
import { TokenService } from "./TokenService";

export class UserService {
  private userRepository: UserRepository;
  private tokenService: TokenService;

  constructor(userRepository: UserRepository, tokenService: TokenService) {
    this.userRepository = userRepository;
    this.tokenService = tokenService;
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
    if (userUpdateDto.password) {
      const hashPassword = await hash(userUpdateDto.password, 10);
      userUpdateDto.password = hashPassword;
    }
    return await this.userRepository.update(id, userUpdateDto);
  }

  async add(userCreateDto: UserCreateDto) {
    const hashPassword = await hash(userCreateDto.password, 10);
    userCreateDto.password = hashPassword;
    return await this.userRepository.add(userCreateDto);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.getByEmail(email);
    if (!user) {
      throw ApiError.BadRequest("Invalid email or password");
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw ApiError.BadRequest("Invalid password");
    }

    const userPayload: UserPayloadDto = {
      id: user.id,
      email: user.email,
      role: user.role,
      login: user.login,
    };

    const accessToken = await this.tokenService.generateAccessToken(
      userPayload
    );
    const refreshToken = await this.tokenService.createRefreshToken(
      userPayload
    );
    return { accessToken, refreshToken };
  }

  async logout(refreshToken: string) {
    try {
      const userPayload = this.tokenService.verifyRefreshToken(refreshToken);
      const storedToken = await this.tokenService.getByToken(refreshToken);

      if (!storedToken || storedToken.user.id !== userPayload!.id) {
        throw ApiError.Unauthorized("Invalid refresh token");
      }

      await this.tokenService.delete(refreshToken);
    } catch (error) {
      throw ApiError.Unauthorized("Invalid or expired refresh token");
    }
  }

  async refresh(refreshToken: string) {
    const userPayload = this.tokenService.verifyRefreshToken(refreshToken);
    if (!userPayload) throw ApiError.Unauthorized("Not authorized");
    const storedToken = await this.tokenService.getByToken(refreshToken);
    if (!storedToken) throw ApiError.Unauthorized("Invalid Session");
    const user = await this.userRepository.getByLogin(userPayload.login);
    if (!user) {
      throw ApiError.Unauthorized("User not found");
    }

    const newUserPayload: UserPayloadDto = {
      id: user.id,
      login: user.login,
      email: user.email,
      role: user.role,
    };

    const newRefreshToken =
      this.tokenService.createRefreshToken(newUserPayload);
    const newAccessToken =
      this.tokenService.generateAccessToken(newUserPayload);

    await this.tokenService.removeByToken(refreshToken);
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
