import { UserRoleRepository } from "./user-role.repository";
import { RoleRepository } from "../roles/role.repository";
import { AppError } from "../../shared/errors/AppError";

export class UserRoleService {
  private userRoleRepository = new UserRoleRepository();
  private roleRepository = new RoleRepository();

  async getUserRoles(userId: string) {
    return this.userRoleRepository.findRolesByUserId(userId);
  }

  async getUserRoleNames(userId: string): Promise<string[]> {
    const roles = await this.userRoleRepository.findRolesByUserId(userId);

    return roles.map((role) => role.name);
  }

  async assignRole(
    userId: string,
    roleName: string,
    assignedBy: string | null,
  ) {
    const role = await this.roleRepository.findByName(roleName);

    if (!role) {
      throw new AppError("Role not found", 404);
    }

    const existingRole = await this.userRoleRepository.findUserRole(
      userId,
      role.id,
    );

    if (existingRole) {
      throw new AppError("User already has this role", 409);
    }

    return this.userRoleRepository.assignRole(userId, role.id, assignedBy);
  }

  async removeRole(userId: string, roleName: string) {
    const role = await this.roleRepository.findByName(roleName);

    if (!role) {
      throw new AppError("Role not found", 404);
    }

    const result = await this.userRoleRepository.removeRole(userId, role.id);

    if (!result.numDeletedRows) {
      throw new AppError("User does not have this role", 404);
    }

    return {
      message: "Role removed successfully",
    };
  }
}
