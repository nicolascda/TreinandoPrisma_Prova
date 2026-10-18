import { Router } from "express"
import  {listar, criar}  from  "../controllers/produtos.controller.js";

const router = Router();


router.get("/", listar);
router.post("/", criar);

export default router;