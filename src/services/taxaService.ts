/**
 * src/services/taxaService.ts
 */

import { ITaxa } from 'src/models/taxa';
import * as repositorio from '../respositories/taxaRepository';
import { IResultado } from '../models/resultado'
import { formataMoeda, formataValorComDecimais } from '../utils/formata_decimal';

function preparaRespostaDocs(oDoc: any): any {
    const valorPadrao = formataValorComDecimais(oDoc.valor_padrao);
    //formataMoeda(oDoc.valor_padrao)
    const doc = {
        id: oDoc._id,
        nome: oDoc.nome,
        descricao: oDoc.descricao?oDoc.descricao:'',
        is_ativa: oDoc.is_ativa,
        is_recorrente: oDoc.is_recorrente,
        periodicidade: oDoc.periodicidade?oDoc.periodicidade:'',
        valor_padrao: valorPadrao,
        tipo: oDoc.tipo?oDoc.tipo:''
    }
    return doc;
}

function preparaRespostaDoc(oDoc: any): any {
    return preparaRespostaDocs(oDoc);
}

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

        const doc = preparaRespostaDoc(response.doc);

        return { sucesso: true, doc }
    } catch (error) {
        throw error;
    }
}

export async function buscaTodos(): Promise<IResultado> {
    try {
        const response = await repositorio.findAll();
        if (!response.sucesso || !Array.isArray(response.docs)) return response;

        const docsProcessados = response.docs.map((element: any) => {
            try {
                return preparaRespostaDocs(element);
            } catch (error) {
                console.error('Erro ao processar a resposta:', error);

                return {
                    sucesso: false,
                    mensagem: 'Erro ao buscar as taxas',
                    erro: error instanceof Error ? error.message : 'Erro desconhecido'
                };        
            }
        });

        return {
            sucesso: true,
            docs: docsProcessados
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

