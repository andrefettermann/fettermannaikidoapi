// src/repositories/cobrancaRepository.ts
import { ObjectId } from "mongodb";
import { Cobranca, ICobranca } from "../models/cobranca";
import { connectDB } from "../db";

/**
 * Repositorio para cobranca.
 * 
 * @author Andre Fettermann
 */

const MENSAGEM_ERRO_LER = "Erro ao ler os dados";
const MENSAGEM_ERRO_INCLUIR = "Erro ao incluir os dados";
const MENSAGEM_ERRO_ATUALIZAR = "Erro ao atualizar os dados";

const lookupPessoa = {
    $lookup: {
        from: "pessoas",
        localField: "id_pessoa",
        foreignField: "_id",
        as: "pessoa"
    }
}

const lookupTaxa = {
    $lookup: {
        from: "taxas",
        localField: "id_taxa",
        foreignField: "_id",
        as: "taxa"
    }
}

const projectCobrancas = {
    $project: {
        _id: 1,
        descricao: 1,
        valor: 1,
        data_vencimento: 1,
        data_emissao: 1,
        situacao: 1,
        periodo_referencia: 1,
        observacoes: 1,
        id_taxa: 1,
        id_pessoa: 1,
        pagamentos: 1,
        'pessoa.nome': 1,
        'taxa.tipo': 1,
        'taxa.nome': 1,
        'taxa.descricao': 1,
        'taxa.valor_padrao': 1
    } 
}


export async function find(id: string): Promise<any> {
    try {
        await connectDB();
        const response: ICobranca[] | null = await Cobranca.aggregate([
                {
                    $match: {"_id": new ObjectId(id)}
                },
                lookupPessoa,
                lookupTaxa,
                projectCobrancas,
                {$unwind: '$pessoa'},
                {$unwind: '$taxa'},
            ]);

        if (response) {
            return {
                sucesso: true,
                doc: response[0]
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

        const result: any = await Cobranca.aggregate(
            [
                lookupPessoa,
                lookupTaxa,
                projectCobrancas,
                {$unwind: '$pessoa'},
                {$unwind: '$taxa'},
            ]).sort( { 'taxa.descricao': 1, 'periodo_referencia': 1} );
                //{ data_vencimento: 1 });

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

export async function findByIdPessoa(oId: string): Promise<any>{
    const id = oId;
    try{
        await connectDB();

        const result: any = await Cobranca.aggregate(
            [
                {
                    $match: {"id_pessoa": new ObjectId(id)}
                },
                lookupPessoa,
                lookupTaxa,
                projectCobrancas,
                {$unwind: '$pessoa'},
                {$unwind: '$taxa'},
            ]).sort( { 'taxa.descricao': 1, 'periodo_referencia': 1} );
                //{ data_vencimento: 1 });

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

export async function findByIdTaxa(oId: string): Promise<any>{
    const id = oId;
    try{
        await connectDB();

        const result: any = await Cobranca.aggregate(
            [
                {
                    $match: {"id_taxa": new ObjectId(id)}
                },
                lookupPessoa,
                lookupTaxa,
                projectCobrancas,
                {$unwind: '$pessoa'},
                {$unwind: '$taxa'},
            ]).sort( { 'taxa.descricao': 1, 'periodo_referencia': 1} );

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
    } catch(error: any){
        throw new Error(error);
    }
}

export async function findByIdPagamento(oId: string): Promise<any>{
    const id = oId;
    try{
        await connectDB();

        const result = await Cobranca.aggregate([
            {
                $match: { 'pagamentos': { $elemMatch: { _id: new ObjectId(id) } } }
            },
            lookupPessoa,
            lookupTaxa,
            projectCobrancas,
            {$unwind: '$pessoa'},
            {$unwind: '$taxa'},
        ]);

        if (result) {
            return {
                sucesso: true,
                doc: result[0]
            }
        } else {
            return {
                sucesso: false,
                erro: MENSAGEM_ERRO_LER
            }
        }
    } catch(error: any){
        console.log(error)
        throw error;
    }
}

export async function insert(data: ICobranca): Promise<any>{
    try {
        await connectDB();

        const result: ICobranca = await Cobranca.create(data);
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

export async function insertPagamento(id: string, data: any): Promise<any>{
    try {
        await connectDB();

        const result =  
            await Cobranca.findByIdAndUpdate(
                {"_id": id}, 
                { $push: { pagamentos: data } },
                {
                    new: true,
                    runValidators: true
                }
            )

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
    } catch (error: any) {
        throw error;
    }
};

export async function update(id: string, data: ICobranca){
    try{
        await connectDB();

        const result: ICobranca | null = 
            await Cobranca.findByIdAndUpdate(
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

export async function updatePagamento(oIdCobranca: string, oIdPagamento: string, data: any): Promise<any>{
    const idCobranca = oIdCobranca;
    const idPagamento = oIdPagamento;
    try {
        await connectDB();

        const result =  
            await Cobranca.findOneAndUpdate(
            { _id: idCobranca, "pagamentos._id": idPagamento },
            { $set: { 'pagamentos.$': data } },
            { new: true, runValidators: true }
            );
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
    } catch (error: any) {
        throw error;
    }
};
