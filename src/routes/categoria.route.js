import { Router } from "express"
import  {criar}  from  "../controllers/categoria.controller.js";

const router = Router();

router.post("/", criar);

export default router;