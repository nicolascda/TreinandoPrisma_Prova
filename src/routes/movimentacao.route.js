import { Router } from "express"
import { entrada, listarSaida, saida } from "../controllers/movimentacao.controller.js";

const router = Router();

router.post("/entrada", entrada);
router.post("/saida", saida);
router.get("/saida", listarSaida);

export default router;