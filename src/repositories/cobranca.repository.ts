// src/repositories/cobranca.repository.ts
import { ObjectId } from "mongodb";
import { Cobranca, ICobranca } from "../models/cobranca";
import { connectDB } from "../db";
import { IResultado } from "../models/resultado";

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


export async function find(id: string): Promise<IResultado> {
    const pipeline = [
        {
            $match: {"_id": new ObjectId(id)}
        },
        lookupPessoa,
        lookupTaxa,
        projectCobrancas,
        {$unwind: '$pessoa'},
        {$unwind: '$taxa'},
    ];
    try {
        await connectDB();
        const response = await Cobranca.aggregate(pipeline);

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

export async function findAll(): Promise<IResultado>{
    const pipeline = [  
        lookupPessoa,
        lookupTaxa,
        projectCobrancas,
        {$unwind: '$pessoa'},
        {$unwind: '$taxa'},
//        { $sort: { 'taxa.descricao': 1, 'periodo_referencia': 1 } }
    ];
    
    try{
        await connectDB();

        const response = await Cobranca.aggregate(pipeline)
            .allowDiskUse(true)
            .option({ maxTimeMS: 15000 })
            .sort({ 'taxa.descricao': 1, 'periodo_referencia': 1 })
            .exec();

            return {
                sucesso: true,
                docs: response
            };
    } catch(error) {
        throw error;
    }
}

export async function findByIdPessoa(oId: string): Promise<IResultado>{
    const id = oId;
    
    const pipeline = [
        {
            $match: {"id_pessoa": new ObjectId(id)}
        },
        lookupPessoa,
        lookupTaxa,
        projectCobrancas,
        {$unwind: '$pessoa'},
        {$unwind: '$taxa'},
        //{ $sort: { 'taxa.descricao': 1, 'periodo_referencia': 1 } }
    ];

    try{
        await connectDB();

        const response: any = await Cobranca.aggregate(pipeline)
        .allowDiskUse(true)
        .option({ maxTimeMS: 15000 })
        .sort( { 'taxa.descricao': 1, 'periodo_referencia': 1} )
        .exec();

        return {
            sucesso: true,
            docs: response
        };
    } catch(error) {
        throw error;
    }
}

export async function findByIdTaxa(oId: string): Promise<IResultado>{
    const id = oId;
    const pipeline = [
        {
            $match: {"id_taxa": new ObjectId(id)}
        },
        lookupPessoa,
        lookupTaxa,
        projectCobrancas,
        {$unwind: '$pessoa'},
        {$unwind: '$taxa'},
    ];
    try{
        await connectDB();

        const response: any = await Cobranca.aggregate(pipeline)
        .allowDiskUse(true)
        .option({ maxTimeMS: 15000 })
        .sort( { 'taxa.descricao': 1, 'periodo_referencia': 1} )
        .exec();

        return {
            sucesso: true,
            docs: response
        };
    } catch(error) {
        throw error;
    }
}

export async function findByIdPagamento(oId: string): Promise<IResultado>{
    const id = oId;
    const pipeline = [
        {
            $match: { 'pagamentos': { $elemMatch: { _id: new ObjectId(id) } } }
        },
        lookupPessoa,
        lookupTaxa,
        projectCobrancas,
        {$unwind: '$pessoa'},
        {$unwind: '$taxa'},
    ];
    
    try{
        await connectDB();

        const response = await Cobranca.aggregate(pipeline)
        .allowDiskUse(true)
        .option({ maxTimeMS: 15000 })
        .sort( { 'taxa.descricao': 1, 'periodo_referencia': 1} )
        .exec();

        return {
            sucesso: true,
            docs: response
        };
    } catch(error) {
        throw error;
    }
}

export async function insert(data: ICobranca): Promise<IResultado>{
    try {
        await connectDB();

        const response = await Cobranca.create(data);
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
};

export async function insertPagamento(id: string, data: any): Promise<IResultado>{
    try {
        await connectDB();

        const response =  await Cobranca.findByIdAndUpdate(
                {"_id": id}, 
                { $push: { pagamentos: data } },
                {
                    new: true,
                    runValidators: true
                }
            )

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
};

export async function update(id: string, data: ICobranca): Promise<IResultado>{
    try{
        await connectDB();

        //const response = await Cobranca.findByIdAndUpdate(
        const response = await Cobranca.findOneAndUpdate(
                {"_id":id}, 
                //data, 
                { $set: { 
                    id_pessoa: data.id_pessoa, 
                    id_evento: data.id_evento,
                    id_taxa: data.id_taxa,
                    data_emissao: data.data_emissao,
                    data_vencimento: data.data_vencimento,
                    descricao: data.descricao,
                    observacoes: data.observacoes,
                    periodo_referencia: data.periodo_referencia,
                    situacao: data.situacao,
                    valor: data.valor
                    } 
                },
                {
                    new: true,
                    runValidators: true
                }
            )
        if(!response){
            return {
                sucesso: false,
                mensagem: "Erro ao atualizar os dados",
                erro: "Registro não encontrado"
            }
        }

        return {
            sucesso: true,
            doc: response
        };
    } catch(error) {
        throw error;
    }
}

export async function updatePagamento(oIdCobranca: string, oIdPagamento: string, data: any): Promise<IResultado>{
    const idCobranca = oIdCobranca;
    const idPagamento = oIdPagamento;

    try {
        await connectDB();

        const response =  
            await Cobranca.findOneAndUpdate(
            { _id: idCobranca, "pagamentos._id": idPagamento },
            { $set: { 'pagamentos.$': data } },
            { new: true, runValidators: true }
            );
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
        };
    } catch(error) {
        throw error;
    }
};

export async function deletePagamento(oIdCobranca: string, oIdPagamento: string): Promise<IResultado>{
    const idCobranca = oIdCobranca;
    const idPagamento = oIdPagamento;

    try {
        await connectDB();

        const response =  
            await Cobranca.findOneAndUpdate(
            { _id: idCobranca, "pagamentos._id": idPagamento },
            { $pull: { pagamentos: { _id: idPagamento } } },
            { new: true, runValidators: true }
            );
        if (!response) {
            return {
                sucesso: false,
                mensagem: "Erro ao excluir o pagamento",
                erro: "Pagamento não encontrado."
            }
        }  

        return {
            sucesso: true,
            doc: response
        };
    } catch(error) {
        throw error;
    }
};
