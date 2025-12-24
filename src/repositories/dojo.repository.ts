// /src/repositories/dojo.repository.ts
import { ObjectId } from "mongodb";
import { Dojo, IDojo } from "../models/dojo";
import { connectDB } from "../db";
import { IResultado } from "../models/resultado";

/**
 * Repositorio de dojo.
 * 
 * @author Andre Fettermann
 */

const lookupAlunos = {
    $lookup: {
        from: "pessoas",
        let: { dojoId: "$_id" },
        pipeline: [
            { $match: { $expr: { $eq: ["$id_dojo", "$$dojoId"] } } },
            { $project: { _id: 1, nome: 1, id_graduacao: 1, situacao: 1 } }
        ],
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
        is_ativo: 1,
        professores: 1
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
            lookupAlunos,
            { $limit: 1 }
        ];

        const response = await Dojo.aggregate(pipeline)
            .allowDiskUse(true)
            .option({ maxTimeMS: 15000 })
            .exec();

        if (response.length === 0) {
            return {
                sucesso: false,
                mensagem: `Dojo não encontrado: ${id}`
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


export async function findAll(): Promise<IResultado> {
    try{
        await connectDB();

        const response = await Dojo.aggregate([
                projectDojos,
                { $sort: { nome: 1 } }
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

export async function findByIsAtivo(ativo: boolean): Promise<IResultado> {
    try {
        await connectDB();
        
        const response = await Dojo.aggregate([
            {
                $match: { 'is_ativo': ativo }
            },  
            //lookupProfessor,
            //projectDojos,
            { $sort: { nome: 1 } }
        ])
        .allowDiskUse(true)
        .option({ maxTimeMS: 15000 })
        .exec();

        // Array vazio é sucesso válido
        return {
            sucesso: true,
            docs: response
        };
        
    } catch (error) {
        throw error;
    }
}

export async function insert(data: IDojo): Promise<IResultado>{
    try {
        await connectDB();

        const response = await Dojo.create(data);
        if (!response) {
            return {
                sucesso: false,
                mensagem: "Erro ao incluir os dados",
            }
        }

        return {
            sucesso: true,
            doc: response // ou: { sucesso: true, id: (response as any)._id }
        }
    } catch(error) {
        throw error;
    }
}

export async function update(id: string, osDados: IDojo): Promise<IResultado> {
    try{
        await connectDB();

        const response = await Dojo.findByIdAndUpdate(
                {"_id": id}, 
                osDados, 
                {
                    new: true,
                    runValidators: true
                }
            )

        if (!response) {
            return {
                sucesso: false,
                mensagem: `Update - Dojo não encontrado: ${id}`,
            }
        }
    
        return {
            sucesso: true,
            doc: response
        }
    }  catch(error){
        throw error;
    }
}

export async function addProfessor(idDojo: string, osDados: { id_pessoa: string, horarios: string}): Promise<IResultado> {
    const idProfessor = osDados.id_pessoa;
    const horarios = osDados.horarios;

    try {
        await connectDB();

        const response = await Dojo.findOneAndUpdate(
            { "_id": idDojo },
            { $addToSet: { professores: { id_professor: new ObjectId(idProfessor) , horarios } } },
            { new: true }
        );

        if (!response) {
            return {
                sucesso: false,
                mensagem: `Dojo não encontrado: ${idDojo}`,
            }
        }

        return {
            sucesso: true,
            doc: response
        }
    } catch (error) {
        console.error('Erro em addProfessor dojo.repository:', error);
        throw error;
    }
}