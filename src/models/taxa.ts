// Taxa.ts
import * as mongodb from 'mongodb';
import { Decimal128, model,Schema } from "mongoose";

/**
 * Interface de dados da taxa.
 * 
 * @author Andre Fettermann
 */
interface ITaxa {
    tipo: string,
    nome: string,
    descricao: string,
    valor_padrao: Decimal128,
    is_recorrente: boolean,
    is_ativa: boolean,
    periodicidade: string
};

/**
 * Schema de taxa.
 * 
 * @author Andre Fettermann
 */
const TaxaSchema = new Schema<ITaxa>({
    tipo: {
        type: String,
        required: [true, 'O tipo é obrigatório.']
    },
    nome: {
        type: String,
        required: [true, 'O nome é obrigatório.']
    },
    descricao: {
        type: String,
        required: false
    },
    valor_padrao: {
        type: mongodb.Decimal128,
        required: false,
        default: 0
    },
    is_recorrente: {
        type: Boolean,
        required: false
    },
    is_ativa: {
        type: Boolean,
        required: false
    },
    periodicidade: {
        type: String,
        required: false
    }
})

const Taxa = model<ITaxa>('taxas', TaxaSchema);

export { Taxa, ITaxa };