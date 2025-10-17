// src/models/Cobranca.ts
import { required } from 'joi';
import * as mongodb from 'mongodb';
import { Decimal128, model, ObjectId, Schema } from "mongoose";

/**
 * Interface de dados da cobranca.
 * 
 * @author Andre Fettermann
 */
interface ICobranca {
    id_pessoa: ObjectId,
    id_taxa: ObjectId,
    id_evento: ObjectId,
    descricao: string,
    valor: Decimal128,
    data_vencimento: Date,
    data_emissao: Date,
    situacao: string,
    periodo_referencia: string,
    observacoes: string
    pagamentos: {
        valor_pago: Decimal128,
        data_pagamento: Date,
        forma_pagamento: string,
        comprovante: string,
        desconto: Decimal128,
        juros: Decimal128,
        observacoes: string
    }[]
};

/**
 * Schema de cobranca.
 * 
 * @author Andre Fettermann
 */
const CobrancaSchema = new Schema<ICobranca>({
    id_pessoa: {
        type: mongodb.ObjectId,
        required: [true, 'A pessoa é obrigatória.']
    },
    id_taxa: {
        type: mongodb.ObjectId,
        required: [true, 'A taxa é obrigatória.']
    },
    id_evento: {
        type: mongodb.ObjectId,
        default: null,
        required: false
    },
    descricao: {
        type: String,
        required: [true, 'A descrição é obrigatória.'],
    },
    valor: {
        type: mongodb.Decimal128,
        required: false
    },
    data_vencimento: {
        type: Date,
        required: [true, 'A data de vencimento é obrigatória.']
    },
    data_emissao: {
        type: Date,
        required: [true, 'A data de emissão é obrigatória.']
    },
    situacao: {
        type: String,
        required: false,
    },
    periodo_referencia: {
        type: String,
        required: [true, 'O período de referência é obrigatório.']
    },
    observacoes: {
        type: String,
        default: null,
        required: false
    },
    pagamentos: [
        {
            valor_pago: {
                type: mongodb.Decimal128,
                required: [true, 'O valoro pago é obrigatório.']
            },
            data_pagamento: {
                type: Date,
                required: false
            },
            forma_pagamento: {
                type: String,
                required: false
            },
            comprovante: {
                type: String,
                required: false
            },
            desconto: {
                type: mongodb.Decimal128,
                required: false
            },
            juros: {
                type: mongodb.Decimal128,
                required: false
            },
            observacoes: {
                type: String,
                requried: false
            }
        }
    ]
})

const Cobranca = model<ICobranca>('cobrancas', CobrancaSchema);

export { Cobranca, ICobranca };