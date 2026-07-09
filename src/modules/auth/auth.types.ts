export interface SignUpDTO {
  email: string;
  password: string;
  name?: string;
}

export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
};
