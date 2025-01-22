import { RoleService } from "../services/RoleService";
import { NextFunction, Request, Response } from "express";

export class RoleController {
  private roleService: RoleService;

  constructor(roleService: RoleService) {
    this.roleService = roleService;
  }

  getRoles = async (_: Request, res: Response): Promise<void> => {
    const roles = await this.roleService.getAll();
    res.status(200).json(roles);
    return;
  };

  getRoleById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
    try {
      const role = await this.roleService.get(id);
      res.status(200).json(role);
      return;
    } catch (e) {
      next(e);
    }
  };

  addRole = async (req: Request, res: Response): Promise<void> => {
    const roleData = req.body;
    const newRole = await this.roleService.add(roleData);
    res.status(201).json(newRole);
    return;
  };

  updateRole = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
    try {
      const roleData = req.body;
      const updatedRole = await this.roleService.update(id, roleData);
      res.status(200).json(updatedRole);
      return;
    } catch (e) {
      next(e);
    }
  };

  deleteRole = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
    try {
      await this.roleService.delete(id);
      res.status(204).send();
      return;
    } catch (e) {
      next(e);
    }
  };
}
