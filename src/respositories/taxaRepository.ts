// taxaRepository.ts
import { Taxa, ITaxa } from "../models/taxa";
import { connectDB } from "../db";

/**
 * Repositorio para taxa.
 * 
 * @author Andre Fettermann
 */

const MENSAGEM_ERRO_LER = "Erro ao ler os dados";
const MENSAGEM_ERRO_INCLUIR = "Erro ao incluir os dados";
const MENSAGEM_ERRO_ATUALIZAR = "Erro ao atualizar os dados";

export async function find(id: string): Promise<any> {
    try {
        await connectDB();
        const response: ITaxa[] | null = await Taxa.findById(id);
        if (response) {
            return {
                sucesso: true,
                doc: response
            }
        } else {
            return {
                sucesso: false,
                erro: MENSAGEM_ERRO_LER
            }
        }
    }  catch(error) {
        throw error;
    }
}

export async function findAll(): Promise<any>{
    try{
        await connectDB();

        const result: ITaxa[] = await Taxa.find({}).sort({ tipo: 1 });
                //Graduacao.find({}).sort({ sequencia: 1 }).lean();
        if (result) {
            return {
                sucesso: true,
                docs: result
            }
        } else {
            return {
                sucesso: false,
                erro: MENSAGEM_ERRO_LER
            }
        }
    } catch(error){
        throw error;
    }
}

export async function insert(data: ITaxa): Promise<any>{
    try {
        await connectDB();

        const result: any = await Taxa.create(data);
        if (result) {
            return {
                sucesso: true,
                id: result
            }
        } else {
            return {
                sucesso: false,
                erro: MENSAGEM_ERRO_INCLUIR
            }
        }
    } catch (error) {
        throw error;
    }
};

export async function update(id: string, data: any){
    try{
        await connectDB();

        const result = 
            await Taxa.findByIdAndUpdate(
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
                erro: MENSAGEM_ERRO_ATUALIZAR
            }
        }
    } catch(error){
        throw error;
    }
}
