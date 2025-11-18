// Pessoa.ts
import * as mongodb from 'mongodb';
import { Decimal128, model, ObjectId, Schema } from "mongoose";

/**
 * Interface de dados da pessoa.
 * 
 * @author Andre Fettermann
 */
interface IPessoa {
    id: string,
    aniversario?: string,
    matricula?: string,
    nome: string,
    situacao: string,
    cpf?: string,
    data_inicio_aikido?: string,
    data_matricula?: string,
    tipo: string,
    id_dojo?: ObjectId,
    id_graduacao: ObjectId,
    promocoes?: {
        data: Date,
        id_graduacao: ObjectId
    }[]
};


/**
 * Schema de pessoa.
 * 
 * @author Andre Fettermann
 */
const PessoaSchema = new Schema<IPessoa>({
    aniversario: {
        type: String,
        required: false
    },
    matricula: {
        type: String,
        required: false
    },
    nome: {
        type: String,
        required: [true, 'O nome é obrigatório.'],
    },
    situacao: {
        type: String,
        required: [true, 'A situação é obrigatória.'],
    },
    cpf: {
        type: String,
        required: false
    },
    data_inicio_aikido: {
        type: String,
        required: false
    },
    data_matricula: {
        type: String,
        required: false
    },
    tipo: {
        type: String,
        required: [true, 'O tipo é obrigatório.'],
    },
    id_dojo: {
        type: mongodb.ObjectId,
        default: null,
        required: false
    },
    id_graduacao: {
        type: mongodb.ObjectId,
        default: null,
        required: [true, 'A graduação é obrigatória.']
    },
    promocoes: [
        {
            data: {
                type: Date,
                required: [true, 'A data da promoção é obrigatória.'],
            },
            id_graduacao: {
                type: mongodb.ObjectId,
                required: [true, 'A graduação promoção é obrigatória.']
            },
        }
    ]
})

const Pessoa = model<IPessoa>('pessoas', PessoaSchema);

export { Pessoa, IPessoa };