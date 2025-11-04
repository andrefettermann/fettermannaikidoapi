// dojoRespository.ts
import { ObjectId } from "mongodb";
import { Dojo, IDojo } from "../models/dojo";
import { connectDB } from "../db";
import { IResultado } from "../models/resultado";

/**
 * Repositorio de dojo.
 * 
 * @author Andre Fettermann
 */

const lookupProfessor = {
    $lookup: {
        from: "pessoas",
        let: { professorId: "$id_professor" },
        pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$professorId"] } } },
            { $project: { _id: 1, nome: 1 } },
            { $limit: 1 }
        ],
        as: "professor"
    }
}

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
        'professor.nome': 1,
        horarios: 1
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
            lookupProfessor,
            lookupAlunos,
            { $limit: 1 }
        ];

        const response: IDojo[] = await Dojo.aggregate(pipeline)
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
        console.error(`Erro em find(id: ${id}):`, error);
        
        return {
            sucesso: false,
            mensagem: `Erro ao buscar o dojo de id ${id}`,
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}


export async function findAll(): Promise<IResultado> {
    try{
        await connectDB();

        const response: IDojo[] = await Dojo.aggregate([
                lookupProfessor,
                //{$unwind: '$professor'},
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
        console.error(`Erro em findAll:`, error);
        
        return {
            sucesso: false,
            mensagem: `Erro ao buscar todos os registros`,
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}

export async function findByIsAtivo(ativo: boolean): Promise<IResultado> {
    try {
        await connectDB();
        
        const response: IDojo[] = await Dojo.aggregate([
            {
                $match: { 'is_ativo': ativo }
            },  
            lookupProfessor,
            projectDojos,
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
        console.error(`Erro em findByIsAtivo(ativo: ${ativo}):`, error);
        
        return {
            sucesso: false,
            mensagem: `Erro ao buscar registros ${ativo ? 'ativos' : 'inativos'}`,
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}

export async function insert(data: IDojo): Promise<IResultado>{
    try {
        await connectDB();

        const response: IDojo = await Dojo.create(data);
        if (!response) {
            return {
                sucesso: false,
                mensagem: "Erro ao incluir os dados",
                erro: "Registro não encontrado"
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

        const response: IDojo | null = 
            await Dojo.findByIdAndUpdate(
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
                mensagem: "Erro ao atualizar os dados",
                erro: "Registro não encontrado"
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