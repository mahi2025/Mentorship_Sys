export interface UserTable {
  id: string;

  first_name: string;

  last_name: string;

  email: string;

  password_hash: string;

  role: string;

  is_verified: boolean;

  created_at: Date;

  updated_at: Date;
}

export interface Database {
  users: UserTable;
}
