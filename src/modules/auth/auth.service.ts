import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserRepository } from "../user/user.repository";
import { registerSchema, loginSchema } from "./auth.validation";

const userRepo = new UserRepository();

export class AuthService {
  async register(data: any) {
    const validated = registerSchema.parse(data);

    const existing = await userRepo.getUserByEmail(validated.email);
    if (existing) {
      throw new Error("User already exists");
    }

    const password_hash = await bcrypt.hash(validated.password, 10);

    const user = await userRepo.createUser({
      first_name: validated.first_name,
      last_name: validated.last_name,
      email: validated.email,
      password_hash,
    });

    return user;
  }

  async login(data: any) {
    const validated = loginSchema.parse(data);

    const user = await userRepo.getUserByEmail(validated.email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(
      validated.password,
      user.password_hash,
    );

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" },
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
