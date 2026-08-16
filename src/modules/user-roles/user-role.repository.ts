import { db } from "../../config/database";

export class UserRoleRepository {
  async findRolesByUserId(userId: string) {
    return db
      .selectFrom("user_role")
      .innerJoin("role", "role.id", "user_role.role_id")
      .select(["role.id", "role.name", "role.description"])
      .where("user_role.user_id", "=", userId)
      .execute();
  }

  async findUserRole(userId: string, roleId: number) {
    return db
      .selectFrom("user_role")
      .selectAll()
      .where("user_id", "=", userId)
      .where("role_id", "=", roleId)
      .executeTakeFirst();
  }

  async assignRole(userId: string, roleId: number, assignedBy: string | null) {
    return db
      .insertInto("user_role")
      .values({
        user_id: userId,
        role_id: roleId,
        assigned_by: assignedBy,
      })
      .executeTakeFirst();
  }

  async removeRole(userId: string, roleId: number) {
    return db
      .deleteFrom("user_role")
      .where("user_id", "=", userId)
      .where("role_id", "=", roleId)
      .executeTakeFirst();
  }
}
