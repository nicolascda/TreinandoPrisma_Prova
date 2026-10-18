import prisma from "../data/data.js";

const dataValida = (valor) => {
    let dataNova = undefined;
    if (valor) {
        dataNova = new Date(valor);
        if (isNaN(dataNova.getTime())) {
            return error
        }
    }
    return dataNova
}

export const valorPorCategoria = async (req, res) => {
    try {
        const linhas = await prisma.$queryRaw`
            SELECT categoria, quantidade, valor_unitario , SUM(valor_total) AS valor_total
            FROM vw_estoque
            GROUP BY categoria
            ORDER BY categoria;`;

        const resultado = linhas.map((l) => ({
            categoria: l.categoria,
            valorTotal: Number(l.valor_total)
        }));

        return res.status(200).json(resultado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro de servidor" });
    }
}


export const movimentacoesPorPeriodo = async (req, res) => {
    try {
        const ini = dataValida(req.body.inicial);
        const fim = dataValida(req.body.final);

        if (!ini || !fim || ini > fim) {
            return res.status(400).json(
                "Informe inicial e final válidas (AAAA-MM-DD), com a inicial não depois da final"
            );
        }

        // até o início do dia seguinte, para incluir o dia final inteiro
        const fimExclusivo = new Date(fim.getTime() + 24 * 60 * 60 * 1000);

        const produtos = await prisma.produtos.findMany({
            orderBy: { nome: "asc" },
            include: {
                entradas: { where: { data_entrada: { gte: ini, lte: fim } } },
                saidas: { where: { data_saida: { gte: ini, lte: fim } } }
            }
        });

        const soma = (lista) => lista.reduce((total, m) => total + m.quantidade, 0);

        const resultado = produtos.map((p) => {
            const totalEntradas = soma(p.entradas);
            const totalSaidas = soma(p.saidas);
            const valor = Number(p.valor_unitario);

            return {
                nomeProduto: p.nome,
                unidadeMedida: p.unidade_medida,
                valor_unitario: valor,
                totalEntradas,
                totalSaidas,
                saldoPeriodo: totalEntradas - totalSaidas,
                valorTotalEntradas: Number((totalEntradas * valor).toFixed(2)),
                valorTotalSaidas: Number((totalSaidas * valor).toFixed(2))
            };
        });

        return res.status(200).json(resultado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro de servidor" });
    }
}



export const VolumePeriodo =  async (req, res ) => {
    try {
        const ini = dataValida(req.body.inicial);
        const fim = dataValida(req.body.final);

        if (!ini || !fim || ini > fim) {
            return res.status(400).json(
                "Informe inicial e final válidas (AAAA-MM-DD), com a inicial não depois da final"
            );
        }


        const produtos = await prisma.produtos.findMany({
            orderBy: { nome: "asc" },
            include: {
                entradas: { where: { data_entrada: { gte: ini, lte: fim } } },
                saidas: { where: { data_saida: { gte: ini, lte: fim } } }
            }
        });

        const soma = (lista) => lista.reduce((total, m) => total + m.quantidade, 0);

        const resultado = produtos.map((p) => {
            const totalEntradas = soma(p.entradas);
            const totalSaidas = soma(p.saidas);
            const valor = Number(p.valor_unitario);

            return {
                nomeProduto: p.nome,
                totalSaidas,
                valorTotalSaidas: Number((totalSaidas * valor).toFixed(2))
            };
        });

        return res.status(200).json(resultado);


    } catch (error) {
        console.error(error.code);
        return res.status(500).json({mensagem: "Erro de servidor", error})
    }
}

export const PercentualProduto = async (req, res ) => {
    try {
        
        const data = req.body;

        if (!data.nome || !data.id_categoria || !data.unidade_medida || !data.valor_unitario || !data.quantidade) {
            return res.status(400).json("Nome ou id_categoria ou unidadeMedida ou valorUnitario ou quantidade estão faltando");


        }

        if (!Number(data.id_categoria) || !Number(data.valor_unitario) || !Number(data.quantidade)) {
            return res.status(400).json("Os valores tem que ser um número")
        }


        const produto = await prisma.produtos.findMany({
            orderBy: { quantidade: "desc" },
            // select: {
            //     id: true,
            //     nome: true,
            //     id_categoria: true,

            // }
        })

        const produtoFormatado = produto.map(produto => {
            const { quantidade , ...resto } = produto;
            return {
                ...resto,
                quantidade: `${quantidade}%`
            };

        });

        return res.status(200).json(produtoFormatado).end();
    } catch (error) {
        return res.status(500).json({mensagem: "Erro de servidor", error})
    }
}