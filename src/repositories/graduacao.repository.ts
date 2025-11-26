// /src/repositories/graduacao.repository.ts
import { ObjectId } from "mongodb";
import { Graduacao, IGraduacao } from "../models/graduacao";
import { connectDB } from "../db";
import { IResultado } from "../models/resultado";

/**
 * Repositorio para graduacao.
 * 
 * @author Andre Fettermann
 */

const lookupPessoas = {
    $lookup: {
        from: "pessoas",
        localField: "_id",
        foreignField: "id_graduacao",
        pipeline: [
            { $project: { _id: 1, nome: 1, situacao: 1 } },
        ],
        as: "pessoas"
    }
}

export async function find(id: string): Promise<IResultado> {
    if (!ObjectId.isValid(id)) {
        return {
            sucesso: false,
            mensagem: "Id inválido"
        }
    }

    const pipeline = [
        { $match: { _id: new ObjectId(id) } },
        lookupPessoas,
        { $limit: 1 }
    ];

    try {
        await connectDB();
        const response = await Graduacao.aggregate(pipeline)
                .allowDiskUse(true)
                .option({ maxTimeMS: 15000 })
                .exec();

        if (response.length === 0) {
            return {
                sucesso: false,
                mensagem: `Graduação não encontrada: id=${id}`
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

export async function findAll(): Promise<IResultado>{
    try{
        await connectDB();

        const response = await Graduacao.aggregate([
                lookupPessoas,
                { $sort: { sequencia: 1 } }
            ])
            .allowDiskUse(true)
            .option({ maxTimeMS: 15000 })
            .exec();

        return {
            sucesso: true,
            docs: response
        };
    } catch(error) {
        throw error;
    }
}

export async function insert(data: IGraduacao): Promise<IResultado> {
    try {
        await connectDB();

        const response = await Graduacao.create(data);
        if (!response) {
            return {
                sucesso: false,
                mensagem: "Não foi posśivel incluir a graduação",
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

export async function update(id: string, data: IGraduacao): Promise<IResultado>{
    try{
        await connectDB();

        const response = 
            await Graduacao.findByIdAndUpdate(
                {"_id": id}, 
                data, 
                {
                    new: true,
                    runValidators: true
                }
            )

        if (!response) {
            return {
                sucesso: false,
                mensagem: `Update - Graduação não encontrada: id=${id}`
            }
        }
    
        return {
            sucesso: true,
            doc: response
        }
    } catch(error){
        throw error;
    }
}

export async function remove(id: String): Promise<IResultado>{
    try {
        await connectDB();
        const response = await Graduacao.deleteOne({"_id":id});
        if (!response) {
            return {
                sucesso: false,
                mensagem: `Delete - Graduação não encontrada: id=${id}`
            }
        }
    
        return {
            sucesso: true,
            doc: response
        }
    } catch(error){
        throw error;
    }
}