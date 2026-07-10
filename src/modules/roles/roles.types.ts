export const Roles = {
  ADMIN: "admin",

  MENTOR: "mentor",

  MENTEE: "mentee",
} as const;

export type RoleName = (typeof Roles)[keyof typeof Roles];