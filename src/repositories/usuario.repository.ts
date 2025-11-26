// /src/repositories/usuario.repository.ts
import { ObjectId } from "mongodb";
import { Usuario, IUsuario } from "../models/usuario";
import { connectDB } from "../db";
import { IResultado } from "../models/resultado";

/**
 * Repositorio para usuario.
 * 
 * @author Andre Fettermann
 */

const lookupPessoa = {
    $lookup: {
        from: "pessoas",
        let: { professorId: "$id_professor" },
        pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$professorId"] } } },
            { $project: { _id: 1, nome: 1 } },
            { $limit: 1 }
        ],
        as: "pessoa"
    }
}

export async function find(id: string): Promise<IResultado> {
    try {
        await connectDB();

        if (!ObjectId.isValid(id)) {
            return {
                sucesso: false,
                mensagem: "Id inválido"
            }
        }

        const pipeline = [
            { $match: { _id: new ObjectId(id) } },
            lookupPessoa,
            { $limit: 1 }
        ];

        const response = await Usuario.aggregate(pipeline)
            .allowDiskUse(true)
            .option({ maxTimeMS: 15000 })
            .exec();

        if (response.length === 0) {
            return {
                sucesso: false,
                mensagem: "Registro não encontrado"
            }
        }

        return {
            sucesso: true,
            doc: response[0]
        }
    } catch(error) {
        throw error;
    }
}

export async function findByEmail(email: string): Promise<IResultado> {
    try {
        await connectDB();

        if (!email || email === '') {
            return {
                sucesso: false,
                mensagem: "E-mail inválido"
            }
        }

        const pipeline = [
            { $match: { 'email': email } },
            lookupPessoa,
            { $limit: 1 }
        ];

        const response = await Usuario.aggregate(pipeline)
            .allowDiskUse(true)
            .option({ maxTimeMS: 15000 })
            .exec();

        if (response.length === 0) {
            return {
                sucesso: false,
                mensagem: 'Email não encontrado.'
            }
        }

        return {
            sucesso: true,
            doc: response[0]
        }
    } catch(error) {
        throw error;
    }
}

export async function insert(data: IUsuario): Promise<IResultado>{
    try {
        await connectDB();

        const response = await Usuario.create(data);
        if (!response) {
            return {
                sucesso: false,
                mensagem: "Erro ao incluir os dados"
            }
        }

        return {
            sucesso: true,
            doc: response // ou: { sucesso: true, id: (response as any)._id }
        }
    } catch (error) {
       throw error;        
    }
};
