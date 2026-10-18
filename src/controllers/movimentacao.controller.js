import prisma from "../data/data.js";

export const listarSaida = async (req, res) => {
    try {
        
        const saidas = await prisma.saidas.findMany({
            orderBy: { data_saida: "desc" }
        })

        return res.status(200).json(saidas)
    } catch (error) {
        return res.status(500).json({mensagem: "Erro de servidor"}, error)
    }
}

export const entrada = async (req, res) => {
    try {
        const data = req.body;

        if (!data.quantidade || !data.id_produto) {
            return res.status(400).json("Precisa do id e quantidade do produto").end();
        }

        if (data.quantidade < 0) {
            return res.status(400).json("O valor tem que ser maior que zero").end();
        }

        if (!Number(data.id_produto)) {
            return res.status(400).json("O id precisa ser um número").end();
        }

        if (Number(data.id_produto) <= 0) {
            return res.status(400).json(" O número precisa ser maior que zero").end();
        }

        let dataEntradaNova = undefined;
        if (data.data_entrada) {
            dataEntradaNova = new Date(data.data_entrada);
            if (isNaN(dataEntradaNova.getTime())) {
                return res.status(400).json("Data inválida. Use o formato AAAA-MM-DD");
            }
        }

        const produtoExiste = await prisma.produtos.findFirst({
            where: {
                id: data.id_produto
            }
        })

        if (!produtoExiste) {
            return res.status(400).json("Produto não existe").end();
        }

        if (data.data_entrada && isNaN(Date.parse(data.data_entrada))) {
            return res.status(400).json("Não está no formato DATE TIME").end();
        }

        if (produtoExiste.quantidade + data.quantidade > 100) {
            return res.status(400).json("A quantidade vai ultrapassar 100").end();
        }

        const ProdutoAtualizado = await prisma.$transaction([

            prisma.entradas.create({
                data: {
                    id_produto: data.id_produto,
                    data_entrada: dataEntradaNova,
                    quantidade: data.quantidade
                }
            }),

            prisma.produtos.update({
                where: {
                    id: data.id_produto
                },
                data:
                    { quantidade: produtoExiste.quantidade + data.quantidade }
            }),

        ])


        return res.status(201).json({ mensagem: "Entrada criada com sucesso", ProdutoAtualizado }).end();

    } catch (error) {
        console.log(error.code);
        console.log(error)

        if (error.code == "P2003") {
            return res.status(404).json("O id de categorias não existe");
        }
        if (error.code === "P2039") {
            return res.status(400).json("Valor de data rejeitado pelo banco");
        }

        return res.status(500).json("Erro de servidor");
    }
}

export const saida = async (req, res) => {
    try {
        const data = req.body;

        if (!data.quantidade || !data.id_produto) {
            return res.status(400).json("Precisa do id e quantidade do produto").end();
        }

        if (data.quantidade < 0) {
            return res.status(400).json("O valor tem que ser maior que zero").end();
        }

        if (!Number(data.id_produto)) {
            return res.status(400).json("O id precisa ser um número").end();
        }

        if (Number(data.id_produto) <= 0) {
            return res.status(400).json(" O número precisa ser maior que zero").end();
        }

        let dataSaidaNova = undefined;
        if (data.data_saida) {
            dataSaidaNova = new Date(data.data_saida);
            if (isNaN(dataSaidaNova.getTime())) {
                return res.status(400).json("Data inválida. Use o formato AAAA-MM-DD");
            }
        }

        const produtoExiste = await prisma.produtos.findFirst({
            where: {
                id: data.id_produto
            }
        })

        if (!produtoExiste) {
            return res.status(400).json("Produto não existe").end();
        }

        if (data.data_entrada && isNaN(Date.parse(data.data_entrada))) {
            return res.status(400).json("Não está no formato DATE TIME").end();
        }

        if (produtoExiste.quantidade - data.quantidade < 0) {
            return res.status(400).json("A quantidade vai ser menor que 0").end();
        }

        const ProdutoAtualizado = await prisma.$transaction([

            prisma.saidas.create({
                data: {
                    id_produto: data.id_produto,
                    data_saida: dataSaidaNova,
                    quantidade: data.quantidade
                }
            }),

            prisma.produtos.update({
                where: {
                    id: data.id_produto
                },
                data:
                {
                    quantidade: produtoExiste.quantidade - data.quantidade
                }
            }),

        ])


        return res.status(201).json({ mensagem: "Saida criada com sucesso", ProdutoAtualizado }).end();

    } catch (error) {
        console.log(error.code);
        console.log(error)

        if (error.code == "P2003") {
            return res.status(404).json("O id de categorias não existe");
        }
        if (error.code === "P2039") {
            return res.status(400).json("Valor de data rejeitado pelo banco");
        }

        return res.status(500).json("Erro de servidor");
    }
}