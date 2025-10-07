import { Document, ObjectId } from "mongodb";
import { IPessoa, Pessoa } from "../models/pessoa";
import { connectDB } from "../db";

const lookupDojo = {
    $lookup: {
        from: "dojos",
        localField: "id_dojo",
        foreignField: "_id",
        as: "dojo"
    }
}

const lookupGraduacao = {
    $lookup: {
        from: "graduacoes",
        localField: "id_graduacao",
        foreignField: "_id",
        as: "graduacao"
    }
}

export async function findAll(): Promise<any>{
    try{
        await connectDB();
        const resultSet: IPessoa[] = await Pessoa.aggregate(
            [
                lookupDojo,
                lookupGraduacao
            ],
        );

        if (resultSet) {
            return {
                sucesso: true,
                docs: resultSet
            }
        } else {
            return {
                sucesso: true,
                erro: "Erro ao ler os dados"
            }
        }
        
    } catch(error){
        throw error;
    }
}
