// Pessoa.ts
import * as mongodb from 'mongodb';
import { Decimal128, model, ObjectId, Schema } from "mongoose";

/**
 * Interface de dados da pessoa.
 * 
 * @author Andre Fettermann
 */
interface IPessoa {
    aniversario: string,
    matricula: string,
    nome: string,
    situacao: string,
    cpf: string,
    data_inicio_aikido: string,
    data_matricula: string,
    tipo: string,
    //is_professor: boolean,
    id_dojo: ObjectId,
    id_graduacao: ObjectId,
    /*
    pagamentos: {
        data: Date,
        valor_devido: Decimal128,
        valor_pago: Decimal128,
        descricao: String,
        observacoes: String
    }[],
    */
    promocoes: {
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
    /*
    is_professor: {
        type: Boolean,
        required: false
    },
    */
    id_dojo: {
        type: mongodb.ObjectId,
        default: null,
        required: false
    },
    id_graduacao: {
        type: mongodb.ObjectId,
        default: null,
        required: false
    },
    /*
    pagamentos: [
        {
            data: {
                type: Date,
                required: [true, 'A data de pagamento é obrigatória.'],
            },
            valor_devido: {
                type: mongodb.Decimal128,
                required: false
            },
            valor_pago: {
                type: mongodb.Decimal128,
                required: [true, 'O valor pago é obrigatório.'],
            },
            descricao: {
                type: String,
                required: false
            },
            observacoes: {
                type: String,
                required: false
            },
        }
    ],
    */
    promocoes: [
        {
            data: {
                type: Date,
                required: [true, 'A data da promoção é obrigatória.'],
            },
            id_graduacao: {
                type: mongodb.ObjectId,
                default: null,
                required: false
            },
        }
    ]
})

const Pessoa = model<IPessoa>('pessoas', PessoaSchema);

export { Pessoa, IPessoa };