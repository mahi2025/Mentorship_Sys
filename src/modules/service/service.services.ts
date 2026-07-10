import { db } from "../../config/database";
import { AppError } from "../../shared/errors/AppError";

export class CreateService{
	async createService(userId: string){
		const service = await db 
		.insertInto("service")
		.values({
			id: number,
			mentor_id: userId,
			title: string,
			description: string,
			type:enum,
			duration:integer,
			price: number,
		})
		.onConflict((oc) => oc.column("mentor_id").doNothing())
		.returningAll(),
		.executeTakeFirst();

		if(service)
			return service;
		return db
			.selectFrom("service")
			.selectAll()
			.where("mentor_id", "=", userId)
			.executeTakeFisrtorThrow();
	}

}
