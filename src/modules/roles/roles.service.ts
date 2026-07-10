import { db } from "../../config/database";
import { AppError } from "../../shared/errors/AppError";
import type { RoleName } from "./roles.types";

export class RolesService {
  async assignRole(userId: string, roleName: RoleName) {
    const role = await db
      .selectFrom("role")
      .selectAll()
      .where("name", "=", roleName)
      .executeTakeFirst();

    if (!role) {
      throw new AppError("Role not found", 404);
    }

    await db
      .insertInto("user_role")
      .values({
        user_id: userId,
        role_id: role.id,
      })
      .onConflict((oc) => oc.columns(["user_id", "role_id"]).doNothing())
      .execute();

    return role;
  }

  async removeRole(userId: string, roleName: RoleName) {
    const role = await db
      .selectFrom("role")
      .select("id")
      .where("name", "=", roleName)
      .executeTakeFirst();

    if (!role) throw new AppError("Role not found", 404);

    await db
      .deleteFrom("user_role")
      .where("user_id", "=", userId)
      .where("role_id", "=", role.id)
      .execute();
  }

  async getUserRoles(userId: string): Promise<RoleName[]> {
    const roles = await db
      .selectFrom("user_role")
      .innerJoin("role", "role.id", "user_role.role_id")
      .select("role.name")
      .where("user_role.user_id", "=", userId)
      .execute();

    return roles.map((role) => role.name as RoleName);
  }

  async hasRole(userId: string, roleName: RoleName) {
    const roles = await this.getUserRoles(userId);

    return roles.includes(roleName);
  }

  async hasAnyRole(userId: string, roleNames: RoleName[]) {
    const roles = await this.getUserRoles(userId);

    return roleNames.some((role) => roles.includes(role));
  }
}
