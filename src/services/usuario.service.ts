/**
 * src/services/usuario.service.ts
 */

import * as repositorio from '../repositories/usuario.repository';
import { IResultado } from '../models/resultado'
import { IUsuario } from 'src/models/usuario';
import bcrypt from 'bcrypt';

function trataException(exception: any): string {
    var mensagem = '';

    if (exception.name === 'ValidationError') {
        // Para um campo específico
        //const mensagemNome = exception.errors.nome?.message;
        //console.log(mensagemNome); // "O nome é obrigatório"
        //return mensagemNome;
        
        // Ou percorrer todos os erros
        
        Object.keys(exception.errors).forEach(campo => {
            //console.log(exception.errors[campo].message);
            mensagem = exception.errors[campo].message;
        });
        
    }    
    return mensagem;
}

function processaResposta(oDoc: any): any {
    const doc = {
        id: oDoc._id,
        email: oDoc.email,
        senha: oDoc.senha,
        perfil: oDoc.perfil,
        pessoa: {
           id: oDoc.pessoa._id,
           nome: oDoc.pessoa.nome,
        }
    }
    return doc;
}

async function processaDados(osDados: any): Promise<IUsuario> {
    const senhaHash = await bcrypt.hash(osDados.senha, 10);
    const dados: IUsuario = {
        email: osDados.email,
        senha: senhaHash,
        id_pessoa: osDados.id_pessoa?osDados.id_pessoa:null,
        perfil: ''
    }

    return dados;
}

export async function busca(oId: string): Promise<IResultado> {
    const id = oId;
    try {
        const response = await repositorio.find(id);
        if (!response.sucesso || !response.doc) return response;

        const doc = processaResposta(response.doc);

        return { sucesso: true, doc }
    } catch (error) {
        return {
            sucesso: false,
            mensagem: 'Erro desconhecido ao buscar o usuario pelo id',
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}

export async function buscaEmail(oEmail: string): Promise<IResultado> {
    const email = oEmail;
    try {
        const response = await repositorio.findByEmail(email);
        if (!response.sucesso || !response.doc) return response;

        const doc = processaResposta(response.doc);

        return { sucesso: true, doc }
    } catch (error) {
        return {
            sucesso: false,
            mensagem: 'Erro desconhecido ao buscar o usuario pelo email',
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}

export async function login(oEmail: string, aSenha: string): Promise<IResultado> {
    const email = oEmail;
    try {
        const response = await repositorio.findByEmail(email);
        
        if (!response.sucesso || !response.doc) {
            return {
                sucesso: false,
                mensagem: 'Email e/ou senha inválido.'
            }
        }

        const doc = processaResposta(response.doc);
        
        //const senhaHash = await bcrypt.hash(aSenha, 10);
        const senhaValida = await bcrypt.compare(aSenha, response.doc.senha);
        if (!senhaValida) {
            return {
                sucesso: false,
                mensagem: 'Email e/ou senha inválido.'
            }
        }

        return { sucesso: true, 
            doc: {
                email: doc.email,
                perfil: doc.perfil
            }
        }
    } catch (error) {
        return {
            sucesso: false,
            mensagem: 'Erro desconhecido ao fazer o login',
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}

export async function inclui(osDados: any): Promise<IResultado> {
    const dados = await processaDados(osDados);
    try {
        let response = await repositorio.findByEmail(dados.email);
        if (response.sucesso) {
            return {
                sucesso: false,
                mensagem: 'Email já cadastrado.'
            }
        }
        
        response = await repositorio.insert(dados);
        return response;
    } catch (error) {
        return {
            sucesso: false,
            mensagem: trataException(error),
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}
