/**
 * src/services/taxaService.ts
 */

import { ITaxa } from 'src/models/taxa';
import * as repositorio from '../respositories/taxaRepository';
import { IResultado } from '../models/resultado'


function setDoc(osDados: any): ITaxa {
    var taxa: ITaxa = {
        'tipo': osDados.tipo,
        'nome': osDados.nome,
        'descricao': osDados.descricao,
        'is_ativa': osDados.is_ativa?true:false,
        'is_recorrente': osDados.is_recorrente?true:false,
        'periodicidade': osDados.periodicidade,
        'valor_padrao': osDados.valor_padrao?osDados.valor_padrao.replace(',', '.'):0,
    };

    return taxa;
}

export async function busca(oId: string): Promise<IResultado> {
    const id = oId;
    try {
        const response = await repositorio.find(id);
        if (!response.sucesso || !response.doc) return response;

        const doc = response.doc;

        return { sucesso: true, doc }
    } catch (error) {
        throw error;
    }
}

export async function buscaTodos(): Promise<IResultado> {
    try {
        const response = await repositorio.findAll();
        if (!response.sucesso || !Array.isArray(response.docs)) return response;

        return {
            sucesso: true,
            docs: response.docs
        };
    } catch (error) {
        throw error;
    }
}

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

export async function inclui(osDados: any): Promise<IResultado> {
    const dados: ITaxa = setDoc(osDados);
    try {
        const response = await repositorio.insert(dados);
        if (!response) {
            return {
                sucesso: false,
                mensagem: 'Erro ao incluir os dados',
                erro: undefined
            };
        }

        return {
            sucesso: true,
            doc: response.doc
        };
    } catch (error) {
        //throw new Error(trataException(error));
        return {
            sucesso: false,
            mensagem: trataException(error)
        }
    }
}

export async function atualiza(oId: string, osDados: any): Promise<any> {
    const id = oId;
    const dados = setDoc(osDados);

    try {
        const response = await repositorio.update(id, dados);
        if (!response.sucesso || !response.doc) {
            return {
                sucesso: false,
                mensagem: 'Erro ao atualizar os dados',
            };
        }

        return {
            sucesso: true,
            doc: response.doc
        };

    } catch (error) {
        //throw new Error(trataException(error));
        return {
            sucesso: false,
            mensagem: trataException(error)
        }
    }
}

