import { Request, Response } from "express";
import { UserService } from "./user.service";
import { ApiResponse } from "../../shared/apiResponse";


const service = new UserService();

export class UserController {
  async createUser(req: Request, res: Response) {
     const user = await service.createUser(req.body);

     ApiResponse.created(res, user, "User created successfully");
  }

  async getUser(req: Request, res: Response) {
  ApiResponse.success(res, user, "User retrieved successfully");
  }

  async getAllUsers(req: Request, res: Response) {
    const users = await service.getAllUsers();
ApiResponse.success(res, users, "Users retrieved successfully");
  }
}
