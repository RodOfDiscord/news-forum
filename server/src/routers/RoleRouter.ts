import { Router } from "express";
import { RoleController } from "../controllers/RoleController";
import { RoleService } from "../services/RoleService";
import { AppDataSource } from "../utils/data-source";
import { RoleRepository } from "../repositories/RoleRepository";
import { Role } from "../entities/Role";
import { RoleUpdateDto } from "../dtos/role/RoleUpdateDto";
import { validation } from "../middlewares/Validation";
import { validateUUID } from "../middlewares/ValidateUUID";
import { RoleCreateDto } from "../dtos/role/RoleCreateDto";

export const roleRouter = Router();

const roleController = new RoleController(
  new RoleService(new RoleRepository(AppDataSource.getRepository(Role)))
);

roleRouter.get("/", roleController.getRoles);
roleRouter.get("/:id", validateUUID("id"), roleController.getRoleById);
roleRouter.post("/", validation(RoleCreateDto), roleController.addRole);
roleRouter.delete("/:id", validateUUID("id"), roleController.deleteRole);
roleRouter.put(
  "/:id",
  validateUUID("id"),
  validation(RoleUpdateDto),
  roleController.updateRole
);
