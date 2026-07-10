import type { RoleName } from "../../modules/roles/roles.types";

export interface AuthenticatedUser {
  id: string;

  email: string;

  name: string;

  roles: RoleName[];
}
