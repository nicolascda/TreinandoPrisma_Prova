import express from "express";
import cors from "cors";

import produtoRoute from "./routes/produtos.route.js";
import categoriaRoute from "./routes/categoria.route.js";
import movimentacaoRoute from "./routes/movimentacao.route.js";
import relatorioRoute from "./routes/relatorio.route.js";

const app = express();

app.use(express.json());
app.use(cors());


app.use("/produtos", produtoRoute);
app.use("/categorias", categoriaRoute);
app.use("/movimentacao", movimentacaoRoute);
app.use("/relatorios", relatorioRoute);

app.get( "/", (req, res) => {
    res.json("Servidor rodando");
})

export default app;