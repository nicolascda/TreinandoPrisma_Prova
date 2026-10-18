import { Router } from "express"
import  { movimentacoesPorPeriodo, valorPorCategoria, VolumePeriodo, PercentualProduto}  from  "../controllers/relatorio.controller.js";

const router = Router();


router.get("/categoriaValor", valorPorCategoria);
router.post("/movimentacaoPeriodo", movimentacoesPorPeriodo);
router.post("/volume", VolumePeriodo );
router.post("/percentual", PercentualProduto);

export default router;