export interface CreateUserDTO {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  is_verified: boolean;
  created_at: Date;
}
