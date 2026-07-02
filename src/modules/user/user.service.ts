import { UserRepository } from "./user.repository";
import { CreateUserDTO } from "./user.types";
import { createUserSchema } from "./user.validation";

export class UserService {
  constructor(private repo = new UserRepository()) {}

  async createUser(payload: CreateUserDTO) {

    const data = createUserSchema.parse(payload);

    const existing = await this.repo.getUserByEmail(data.email);
    if (existing) {
      throw new Error("User already exists");
    }


    const password_hash = "hashed_" + data.password;

    return await this.repo.createUser({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password_hash,
    });
  }

  async getUser(id: string) {
    const user = await this.repo.getUserById(id);
    if (!user) throw new Error("User not found");
    return user;
  }

  async getAllUsers() {
    return await this.repo.getAllUsers();
  }
}
