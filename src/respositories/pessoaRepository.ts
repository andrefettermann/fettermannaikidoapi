import { ObjectId } from "mongodb";
import { IPessoa, Pessoa } from "../models/pessoa";
import { connectDB } from "../db";
import { IResultado } from "../models/resultado";

const lookupDojo = {
    $lookup: {
        from: 'dojos',
        let: { dojoId: "$id_dojo" },
        pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$dojoId"] } } },
            { $project: { _id: 1, nome: 1 } },
            { $limit: 1 }
        ],
        as: 'dojo'
    }
}

const lookupGraduacao = {
    $lookup: {
        from: 'graduacoes',
        let: { graduacaoId: "$id_graduacao" },
        pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$graduacaoId"] } } },
            { $project: { _id: 1, nome: 1, faixa: 1, sequencia: 1 } },
            { $limit: 1 }
        ],
        as: 'graduacao'
    }
}

export async function find(id: string): Promise<IResultado> {
    if (!ObjectId.isValid(id)) {
        return {
            'sucesso': false,
            'mensagem': "Id inválido"
        }
    }

    const pipeline = [
        { $match: { _id: new ObjectId(id) } },
        lookupDojo,
        lookupGraduacao,
        {
            $project: {
                _id: 1,
                nome: 1,
                aniversario: 1,
                matricula: 1,
                situacao: 1,
                cpf: 1,
                tipo: 1,
                data_inicio_aikido: 1, 
                data_matricula: 1,
                promocoes: 1,
                dojo: 1,
                graduacao: 1
            } 
        },
        { $limit: 1 }
    ];

    try {
        await connectDB();

        const response: IPessoa[] = await Pessoa.aggregate(pipeline)
        .allowDiskUse(true)
        .option({ maxTimeMS: 15000 })
        .exec();

        if (response.length === 0) {
            return {
                'sucesso': false,
                'mensagem': "Pessoa não encontrada."
            }
        }

        return {
            'sucesso': true,
            'doc': response[0]
        }

    } catch(error) {
        console.error(`Erro em find(id: ${id}):`, error);
        
        return {
            'sucesso': false,
            'mensagem': `Erro ao buscar a pessoa de id ${id}`,
            'erro': error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}

export async function findAll(): Promise<IResultado>{
    const pipeline = [
        lookupDojo,
        lookupGraduacao,
        {
            $project: {
                _id: 1,
                nome: 1,
                aniversario: 1,
                matricula: 1,
                situacao: 1,
                dojo: 1,
                graduacao: 1
            } 
        },
    ];

    try {
        await connectDB();

        const response: IPessoa[] = await Pessoa.aggregate(pipeline)
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
            'sucesso': false,
            'mensagem': `Erro ao buscar todos os dojos`,
            'erro': error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}

export  async function findBySituacao(situacao: string): Promise<IResultado> {
    const pipeline = [
        {
            $match: {'situacao': situacao}
        },
        lookupDojo,
        lookupGraduacao,
        {
            $project: {
                _id: 1,
                nome: 1,
                aniversario: 1,
                matricula: 1,
                situacao: 1,
                dojo: 1,
                graduacao: 1
            } 
        },
    ];

    try {
        await connectDB();
        const response: IPessoa[] = await Pessoa.aggregate(pipeline)
                .allowDiskUse(true)
                .option({ maxTimeMS: 15000 })
                .exec();        
        
        return {
            'sucesso': true,
            'docs': response
        };
    } catch(error){
        console.error(`Erro em findBySituacao(situacao: ${situacao}):`, error);
        
        return {
            'sucesso': false,
            'mensagem': `Erro ao buscar a pessoa de situacao ${situacao}`,
            'erro': error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}

export async function findByTipo(oTipo: string): Promise<IResultado> {
    const tipo = oTipo;

    const pipeline = [
        {
            $match: {'tipo': tipo}
        },
        lookupDojo,
        lookupGraduacao,
        {
            $project: {
                _id: 1,
                nome: 1,
                aniversario: 1,
                matricula: 1,
                situacao: 1,
                dojo: 1,
                graduacao: 1
            } 
        },
    ];

    try {
        await connectDB();
        const response: IPessoa[] = await Pessoa.aggregate(pipeline)
        .allowDiskUse(true)
        .option({ maxTimeMS: 15000 })
        .exec();        

        return {
            'sucesso': true,
            'docs': response
        };
    } catch(error){
        console.error(`Erro em findByTipo(oTipo: ${tipo}):`, error);

        return {
            'sucesso': false,
            'mensagem': `Erro ao buscar a pessoa do tipo ${tipo}`,
            'erro': error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}

export async function findByAniversario(oMes: string): Promise<IResultado> {
    const mes = oMes;

    try {
        await connectDB();
        const response: IPessoa[] = await Pessoa.aggregate([
            {
                $match: {'aniversario': { $regex: mes + '$', $options: 'i' }}
            },
            lookupDojo,
            lookupGraduacao,
            {
                $project: {
                    _id: 1,
                    nome: 1,
                    aniversario: 1,
                    matricula: 1,
                    situacao: 1,
                    dojo: 1,
                    graduacao: 1
                } 
            },
            //{ $sort: { aniversario: 1 } }
        ])
        .allowDiskUse(true)
        .option({ maxTimeMS: 15000 })
        .sort({ aniversario: 1 })
        .exec();        

        return {
            'sucesso': true,
            'docs': response
        };
    } catch(error){
        console.error(`Erro em findByAniversario(mes: ${mes}):`, error);
        
        return {
            'sucesso': false,
            'mensagem': `Erro ao buscar os aniversariantes do mes ${mes}`,
            'erro': error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}

export async function findByIdGraduacao(id: string): Promise<IResultado> {
    try {
        
        await connectDB();
        const response = await Pessoa.find({id_graduacao: id});
        
        return {
            'sucesso': true,
            'docs': response
        }
    } catch(error){
        console.error(`Erro em findByIdGraduacao(mes: ${id}):`, error);
        
        return {
            'sucesso': false,
            'mensagem': `Erro ao buscar as pessoa com a graduacao ${id}`,
            'erro': error instanceof Error ? error.message : 'Erro desconhecido'
        };

    }
}


export async function insert(doc: IPessoa): Promise<IResultado>{
    try {
        await connectDB();

        const response = await Pessoa.create(doc);
        if (!response) {
            return {
                'sucesso': false,
                'mensagem': "Erro ao incluir os dados",
                'erro': "Registro não encontrado"
            }
        }

        return {
            'sucesso': true,
            'doc': response // ou: { sucesso: true, id: (response as any)._id }
        }
    } catch (error) {
        console.log(error)
        throw error;
    }
};

export async function update(id: string, doc: any): Promise<IResultado>{
    try{
        await connectDB();

        const response = await Pessoa.findByIdAndUpdate(
            {"_id": id},
            doc,
            {
                new: true,
                runValidators: true
            }
        )

        if (!response) {
            return {
                'sucesso': false,
                'mensagem': "Erro ao atualizar os dados",
                'erro': "Registro não encontrado"
            }
        }
    
        return {
            'sucesso': true,
            'doc': response
        }
    }
    catch(error){
        throw error;
    }
}
