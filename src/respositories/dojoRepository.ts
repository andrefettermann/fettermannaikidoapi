// dojoRespository.ts
import { ObjectId } from "mongodb";
import { Dojo, IDojo } from "../models/dojo";
import { connectDB } from "../db";

/**
 * Repositorio de dojo.
 * 
 * @author Andre Fettermann
 */

const lookupProfessor = {
    $lookup: {
        from: "pessoas",
        localField: "id_professor",
        foreignField: "_id",
        as: "professor"
    }
}

const lookupAlunos = {
    $lookup: {
        from: "pessoas",
        localField: "_id",
        foreignField: "id_dojo",
        as: "alunos"
    }
}

const projectDojos = {
    $project: {
        _id: 1,
        local: 1,
        bairro: 1,
        nome: 1,
        endereco: 1,
        cidade: 1,
        uf: 1,
        'professor.nome': 1,
        horarios: 1
    } 
}

const projectDojo = {
    $project: {
        _id: 1,
        local: 1,
        nome: 1,
        endereco: 1,
        cidade: 1,
        bairro: 1,
        uf: 1,
        pais: 1,
        url: 1,
        email: 1,
        horarios: 1,
        id_professor: 1,
        'professor.nome': 1,
        alunos: 1
    } 
}

export async function find(id: string): Promise<any> {
    try {
        await connectDB();

        const result: IDojo[] = 
            await Dojo.aggregate([
                {
                    $match: {"_id": new ObjectId(id)}
                },  
                lookupProfessor,
                //{$unwind: '$professor'},
                lookupAlunos,
                //projectDojo,
            ])
        if (result) {
            return {
                sucesso: true,
                doc: result[0]
            }
        } else {
            return {
                sucesso: false,
                erro: "Erro ao ler os dados"
            }
        }
    } catch(error) {
        throw (error);
    }
}


export async function findAll(): Promise<any> {
    try{
        await connectDB();

        const result: IDojo[] = await Dojo.aggregate(
            [
                lookupProfessor,
                //{$unwind: '$professor'},
                projectDojos,
            ]).sort({ nome: 1 });

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
    } catch(error) {
        throw (error);
    }
}

export async function insert(data: IDojo): Promise<any>{
    try {
        await connectDB();

        const result: IDojo = await Dojo.create(data);
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

export async function update(oId: string, osDados: IDojo): Promise<any> {
    try{
        await connectDB();

        const result: IDojo | null = 
            await Dojo.findByIdAndUpdate(
                {"_id":oId}, 
                osDados, 
                {
                    new: true,
                    runValidators: true
                }
            )
        
        if(result){
            return {
                sucesso: true,
                doc: result
            }
        } else {
            return {
                sucesso: false,
                erro: "Erro ao atualizar os dados"
            }
        }
    }
    catch(error){
        throw error;
    }
}
