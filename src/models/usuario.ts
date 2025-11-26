// src/models/usuario.ts
import * as mongodb from 'mongodb';
import { model, ObjectId, Schema } from "mongoose";

/**
 * Interface de dados do usuario.
 * 
 * @author Andre Fettermann
 */
interface IUsuario {
    email: string,
    senha: string,
    id_pessoa: ObjectId,
    perfil: string
};

/**
 * Schema de usuario.
 * 
 * @author Andre Fettermann
 */
const UsuarioSchema = new Schema<IUsuario>({
    email: {
        type: String,
        required: [true, 'O email é obrigatório.']
    },
    senha: {
        type: String,
        required: [true, 'A senha é obrigatória.']
    },
    id_pessoa: {
        type: mongodb.ObjectId,
        default: null,
        required: false
    },
    perfil: {
        type: String,
        required: [true, 'O perfil é obrigatório.']
    }
})

const Usuario = model<IUsuario>('usuarios', UsuarioSchema);

export { Usuario, IUsuario };