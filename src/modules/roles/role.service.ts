import { RoleRepository } from "./role.repository";
import { AppError } from "../../shared/errors/AppError";

export class RoleService {
  private roleRepository = new RoleRepository();

  async getRoles() {
    return this.roleRepository.findAll();
  }

  async getRoleById(id: number) {
    const role = await this.roleRepository.findById(id);

    if (!role) {
      throw new AppError("Role not found", 404);
    }

    return role;
  }

  async createRole(data: { name: string; description?: string | null }) {
    const existingRole = await this.roleRepository.findByName(data.name);

    if (existingRole) {
      throw new AppError("Role already exists", 409);
    }

    return this.roleRepository.create(data);
  }
}
