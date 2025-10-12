// dojo.ts
import * as mongodb from 'mongodb';
import { model, ObjectId, Schema } from "mongoose";

/**
 * Interface de dados do dojo.
 * 
 * @author Andre Fettermann
 */
interface IDojo {
    nome: string,
    local: string,
    endereco: string,
    bairro: string,
    cidade: string,
    uf: string,
    pais: string,
    url: string,
    email: string,
    id_professor: ObjectId,
    horarios: string
};

/**
 * Schema de taxa.
 * 
 * @author Andre Fettermann
 */
const DojoSchema = new Schema<IDojo>({
    nome: {
        type: String,
        required: true
    },
    local: {
        type: String,
        required: false
    },
    endereco: {
        type: String,
        required: false
    },
    bairro: {
        type: String,
        required: false
    },
    cidade: {
        type: String,
        required: false
    },
    uf: {
        type: String,
        required: false
    },
    pais: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    id_professor: {
        type: mongodb.ObjectId,
        required: false
    },
    horarios: {
        type: String,
        required: false
    }

})

const Dojo = model<IDojo>('dojos', DojoSchema);

export { Dojo, IDojo };