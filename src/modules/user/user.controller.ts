import { Request, Response } from "express";
import { UserService } from "./user.service";

const service = new UserService();

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const user = await service.createUser(req.body);
      res.status(201).json(user);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const user = await service.getUser(req.params.id);
      res.json(user);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    const users = await service.getAllUsers();
    res.json(users);
  }
}
