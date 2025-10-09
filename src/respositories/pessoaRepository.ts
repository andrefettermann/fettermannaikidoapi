import { ObjectId } from "mongodb";
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

export async function find(id: string): Promise<any> {
    try {
        await connectDB();
        const result: IPessoa[] = 
            await Pessoa.aggregate([
                {
                    $match: {"_id": new ObjectId(id)}
                },
                lookupDojo,
                lookupGraduacao
                //{$unwind: '$dojo'},
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
    } catch(error){
        throw error;
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

export  async function findBySituacao(situacao: string): Promise<any> {
    try {
        await connectDB();
        const result: IPessoa[] = await Pessoa.aggregate([
                    {
                        $match: {'situacao': situacao}
                    },  
                    lookupDojo,
                    lookupGraduacao
                    //{$unwind: '$dojo'},
                ]);
        
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

export  async function findByIsProfessor(isProfessor: boolean): Promise<any> {
    try {
        await connectDB();
        const result: IPessoa[] = await Pessoa.aggregate([
                    {
                        $match: {'is_professor': isProfessor}
                    },  
                    lookupDojo,
                    lookupGraduacao
                    //{$unwind: '$dojo'},
                ]);
        
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

export async function findByAniversario(mes: string): Promise<any> {
    try {
        await connectDB();
        const result: IPessoa[] = await Pessoa.aggregate([
            {
                $match: {'aniversario': { $regex: mes + '$', $options: 'i' }}
            },  
            lookupDojo,
            lookupGraduacao
            //{$unwind: '$dojo'},
        ]).sort({ aniversario: 1});
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

export async function findByIdDojo(id: string): Promise<any> {
    try {
        await connectDB();
        const result: IPessoa[] = await Pessoa.find({id_dojo: id});
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

export async function insert(doc: any): Promise<any>{
    try {
        await connectDB();

        const result = await Pessoa.create(doc);
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

export async function update(id: string, doc: any): Promise<any>{
    try{
        await connectDB();

        const result = await Pessoa.findByIdAndUpdate(
            {"_id":id}, doc, {new: true})
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
    }
    catch(error){
        throw error;
    }
}
