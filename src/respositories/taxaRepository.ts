// taxaRepository.ts
import { ObjectId } from "mongodb";
import { Taxa, ITaxa } from "../models/taxa";
import { connectDB } from "../db";
import { IResultado } from "../models/resultado";

/**
 * Repositorio para taxa.
 * 
 * @author Andre Fettermann
 */

export async function find(id: string): Promise<IResultado> {
    const pipeline = [
        { $match: { _id: new ObjectId(id) } },
        { $limit: 1 }
    ];

    try {
        await connectDB();

        const response = await Taxa.aggregate(pipeline)
        .allowDiskUse(true)
        .option({ maxTimeMS: 15000 })
        .exec();

        //const response = await Taxa.findById(id).allowDiskUse(true).exec();
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
    }  catch(error) {
        if (process.env.NODE_ENV === 'development') {
            console.error(`Erro em find(id: ${id}):`, error);
        }
        
        return {
            sucesso: false,
            mensagem: `Erro ao buscar a taxa de id ${id}`,
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}

export async function findAll(): Promise<IResultado>{
    try{
        await connectDB();

        const response = await Taxa.find({}).sort({ tipo: 1 });

        return {
            sucesso: true,
            docs: response
        };
    } catch(error){
        if (process.env.NODE_ENV === 'development') {
            console.error(`Erro em findAll:`, error);
        }
        
        return {
            sucesso: false,
            mensagem: `Erro ao buscar todos os registros`,
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}

export async function insert(data: ITaxa): Promise<IResultado>{
    try {
        await connectDB();

        const response = await Taxa.create(data);
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
    } catch (error) {
        throw error;
    }
};

export async function update(id: string, data: any): Promise<IResultado>{
    try{
        await connectDB();

        const response = await Taxa.findByIdAndUpdate({"_id":id}, data, 
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
        } catch(error){
            throw error;
        }
    }
