/* apiGraduacaoRepository.ts */
import { ObjectId } from "mongodb";
import { Graduacao, IGraduacao } from "../models/graduacao";
import { connectDB } from "../db";

/**
 * Repositorio para graduacao.
 * 
 * @author Andre Fettermann
 */

const lookupPessoa = {
    $lookup: {
        from: "pessoas",
        localField: "_id",
        foreignField: "id_graduacao",
        as: "pessoas"
    }
}

export async function find(id: string): Promise<any> {
    try {
        await connectDB();
        const response: IGraduacao[] = await Graduacao.aggregate([
                    {
                        $match: {"_id": new ObjectId(id)}
                    },
                    lookupPessoa,
                ])
        if (response) {
            return {
                sucesso: true,
                doc: response[0]
            }
        } else {
            return {
                sucesso: false,
                erro: "Erro ao ler os dados"
            }
        }
    }  catch(error) {
        throw error;
    }
}

export async function findAll(): Promise<any>{
    try{
        await connectDB();

        const result: IGraduacao[] = await 
                Graduacao.find({}).sort({ sequencia: 1 }).lean();
        if (result) {
            return {
                sucesso: true,
                docs: result
            }
        } else {
            return {
                sucesso: false,
                erro: "Erro ao ler os dados"
            }
        }
    } catch(error){
        throw error;
    }
}

export async function insert(data: IGraduacao): Promise<any> {
    try {
        await connectDB();

        const result: IGraduacao = await Graduacao.create(data);
        if (result) {
            return {
                sucesso: true,
                id: result
            }
        } else {
            return {
                sucesso: false,
                erro: "Erro ao incluir os dados"
            }
        }
    } catch (error) {
        throw error;
    }
};

export async function update(id: string, data: IGraduacao): Promise<any>{
    try{
        await connectDB();

        const result: IGraduacao | null = 
            await Graduacao.findByIdAndUpdate(
                {"_id":id}, 
                data, 
                {
                    new: true,
                    runValidators: true
                }
            )
        if(result){
            return {
                sucesso: true,
                total_modificado: result
            }
        } else {
            return {
                sucesso: false,
                erro: "Erro ao atualizar os dados"
            }
        }
    } catch(error){
        throw error;
    }
}

export async function deleteGraduacao(id: String) {
    try {
        await connectDB();
        const graduacao = await Graduacao.deleteOne({"_id":id});
        return graduacao;
    } catch(error){
        return error;
    }

}