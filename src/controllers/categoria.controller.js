import { Prisma } from "@prisma/client";
import prisma from "../data/data.js";


export const criar = async (req, res ) => {
    try {
        const data = req.body;

        if (!data.nome)
        {
            return res.status(400).json("O nome precisa existir").end();
        }

        const categoria = await prisma.categorias.create({
            data: {
                nome: data.nome
            }
        })

        return res.status(200).json({mensagem: "Categoria criada com sucesso", categoria}).end();
    } catch (error) {
        console.log(error.code);
        return res.status(500).json(`erro de servidor ${error}`).end();
    }
}