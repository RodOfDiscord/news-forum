import { Role } from "../../entities/Role";

export class UserPayloadDto {
  id: string;
  login: string;
  email: string;
  role: Role;
}
