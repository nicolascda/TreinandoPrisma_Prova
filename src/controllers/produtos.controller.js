import { Prisma } from "@prisma/client";
import prisma from "../data/data.js";

export const listar = async (req, res) => {
    try {
        const estoque = await prisma.produtos.findMany();
        res.status(200).json(estoque).end();
    }
    catch (error) {
        res.status(500).json(`Erro de servidor: ${error}`)
    }
}

export const criar = async (req, res) => {
    try {
        const data = req.body;

        if (!data.nome || !data.id_categoria || !data.unidade_medida || !data.valor_unitario || !data.quantidade) {
            return res.status(400).json("Nome ou id_categoria ou unidadeMedida ou valorUnitario ou quantidade estão faltando");


        }

        if (!Number(data.id_categoria) || !Number(data.valor_unitario) || !Number(data.quantidade)) {
            return res.status(400).json("Os valores tem que ser um número")
        }

        if (data.quantidade < 0 || data.quantidade > 100) {
            return res.status(400).json("O estoque tem um limite de 100 e não pode ser negativo")
        }

        const produto = await prisma.produtos.create({
            data: {
                nome: data.nome,
                id_categoria: data.id_categoria,
                unidade_medida: data.unidade_medida,
                valor_unitario: data.valor_unitario,
                quantidade: data.quantidade,
            }
        });

        return res.status(201).json(produto)


    } catch (error) {
        console.log(error.code)

        if (error.code == "P2003") {
            return res.status(404).json("O id de categorias não existe");
        }

        return res.status(500).json(`Erro de servidor: ${error}`)


    }
}
