import type { Request, Response, NextFunction } from "express";
import { services } from "./service.services";
import { ApiResponse } from "../../shared/responses/ApiResponse";
import { AppError } from "../../shared/erros/AppError";


export async function createService(
	req: Request, 
	res: Response, 
	next: NextFunction,
){
	try { 
		const userId = req.user?id;

		if(!userId){
			throw new AppError("Unauthorized", 401);
		}

		return ApiResonse.success(res, service, "service created");
	} catch(error) {
		console.error("service error:", error);

	next(error);
	}
}
