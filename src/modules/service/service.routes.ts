import { Router } from "express;
import { createService } from "./service.controller";


const router = Router();

router.post("services/create", createService);


export default router;

