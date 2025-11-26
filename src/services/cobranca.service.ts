// src/services/cobranca.service.ts
import { convertDdMmYyyyToDate, formatDateDDMMAAAA } from '../utils/date';
import { ICobranca } from '../models/cobranca';
import * as repositorio from '../repositories/cobranca.repository';
import { decripta } from '../utils/crypto';
import { IResultado } from '../models/resultado';

function setDocCobranca(osDados: any): ICobranca {
    var doc: ICobranca = {
        'id_pessoa': osDados.id_pessoa?osDados.id_pessoa:null,
        'id_taxa': osDados.id_taxa?osDados.id_taxa:null,
        'id_evento': osDados.id_evento,
        'descricao': osDados.descricao,
        'valor': osDados.valor?osDados.valor.replace(',', '.'):0,
        'data_vencimento': osDados.data_vencimento!=''
            ?convertDdMmYyyyToDate(osDados.data_vencimento)
            :osDados.data_vencimento,
        'data_emissao': osDados.data_emissao!=''
            ?convertDdMmYyyyToDate(osDados.data_emissao)
            :osDados.data_emissao,
        'situacao': osDados.situacao,
        'periodo_referencia': osDados.periodo_referencia,
        'observacoes': osDados.observacoes,
        'pagamentos': []
    };

    return doc;
}

function setDocPagamento(osDados: any): any {
    var doc = {
        'valor_pago': osDados.valor_pago?osDados.valor_pago.replace(',', '.'):0,
        'data_pagamento': osDados.data_pagamento!=''
            ?convertDdMmYyyyToDate(osDados.data_pagamento)
            :osDados.data_pagamento,
        'forma_pagamento': osDados.forma_pagamento,
        'comprovante': osDados.comprovante,
        'desconto': osDados.desconto?osDados.desconto.replace(',', '.'):0,
        'juros': osDados.juros?osDados.juros.replace(',', '.'):0,
        'observacoes': osDados.observacoes
    }

    return doc;
}

export async function busca(oId: string): Promise<IResultado> {
    const id = oId;
    try {
        const response = await repositorio.find(id);
        if (!response.sucesso || !response.doc) return response;

        if (response.doc.pessoa.nome) 
            response.doc.pessoa.nome = decripta(response.doc.pessoa.nome);

        return { sucesso: true, doc: response.doc };
    } catch (error: any) {
        return {
            sucesso: false,
            mensagem: 'Erro desconhecido ao buscar a cobrança pelo id',
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}

export async function buscaTodos(): Promise<IResultado> {
    try {
        const response = await repositorio.findAll();
        if (!response.sucesso || !Array.isArray(response.docs)) return response;

        response.docs.forEach((doc: any) => {
            if (doc.pessoa.nome) 
                doc.pessoa.nome = decripta(doc.pessoa.nome);
        });

        return {
            sucesso: true,
            docs: response.docs
        };
    } catch (error) {
        return {
            sucesso: false,
            mensagem: 'Erro desconhecido ao buscar todas as cobranças',
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}

export async function buscaPorTaxa(oId: string): Promise<IResultado> {
    const id = oId;
    try {
        const response = await repositorio.findByIdTaxa(id);
        if (!response.sucesso || !Array.isArray(response.docs)) return response;

        response.docs.forEach((doc: any) => {
            if (doc.pessoa.nome) 
                doc.pessoa.nome = decripta(doc.pessoa.nome);
        });

        return {
            sucesso: true,
            docs: response.docs
        };
    } catch (error) {
        return {
            sucesso: false,
            mensagem: 'Erro desconhecido ao buscar a cobrança pela taxa',
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}

export async function buscaPorPagamento(oId: string): Promise<IResultado> {
    const id = oId;
    try {
        const response = await repositorio.findByIdPagamento(id);
        if (!response.sucesso || !Array.isArray(response.docs)) return response;

        response.docs.forEach((doc: any) => {
            if (doc.pessoa.nome) 
                doc.pessoa.nome = decripta(doc.pessoa.nome);
        });

        return {
            sucesso: true,
            docs: response.docs
        };
    } catch (error) {
        return {
            sucesso: false,
            mensagem: 'Erro desconhecido ao buscar a cobrança pelo pagamento',
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}

export async function buscaPorPessoa(oId: string): Promise<IResultado> {
    const id = oId;
    try {
        const response = await repositorio.findByIdPessoa(id);
        if (!response.sucesso || !Array.isArray(response.docs)) return response;

        response.docs.forEach((doc: any) => {
            if (doc.pessoa.nome) 
                doc.pessoa.nome = decripta(doc.pessoa.nome);
        });

        return {
            sucesso: true,
            docs: response.docs
        };
    } catch (error) {
                return {
            sucesso: false,
            mensagem: 'Erro desconhecido ao buscar a cobrança pela pessoa',
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
        };
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
    const dados: ICobranca = setDocCobranca(osDados);
    try {
        const response = await repositorio.insert(dados);
        if (!response.sucesso || !response.doc) {
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
        return {
            sucesso: false,
            mensagem: trataException(error)
        }
    }
}

export async function atualiza(oId: string, osDados: any): Promise<IResultado> {
    const id = oId;
    const dados: ICobranca = setDocCobranca(osDados);
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
        return {
            sucesso: false,
            mensagem: trataException(error)
        }
    }
}

export async function incluiPagamento(oId: string, osDados: any): Promise<IResultado> {
    const dados = setDocPagamento(osDados);
    const id = oId;
    try {
        const response = await repositorio.insertPagamento(id, dados);
        if (!response.sucesso || !response.doc) {
            return {
                sucesso: false,
                mensagem: 'Erro ao incluir o pagamento',
            };
        }

        return {
            sucesso: true,
            doc: response.doc
        };
    } catch (error) {
        return {
            sucesso: false,
            mensagem: trataException(error)
        }
    }
}

export async function atualizaPagamento(osDados: any): Promise<IResultado> {
    const idCobranca = osDados.id_cobranca;
    const idPagamento = osDados.id_pagamento;
    const dados = setDocPagamento(osDados);

    try {
        const response = await repositorio.updatePagamento(
            idCobranca, idPagamento, dados);
        if (!response.sucesso || !response.doc) {
            return {
                sucesso: false,
                mensagem: 'Erro ao atualizar o pagamento',
            };
        }

        return {
            sucesso: true,
            doc: response.doc
        };
    } catch (error) {
        return {
            sucesso: false,
            mensagem: trataException(error)
        }
    }
}

export async function excluiPagamento(oIdCobranca: string, oIdPagamento: string): Promise<IResultado> {
    const idCobranca = oIdCobranca;
    const idPagamento = oIdPagamento;

    if (!idCobranca || idCobranca === '') {
        return {
            sucesso: false,
            mensagem: 'A cobranca é obrigatória.',
        };
    }

    if (!idPagamento || idPagamento === '') {
        return {
            sucesso: false,
            mensagem: 'O pagamento é obrigatório.',
        };
    }

    try {
        const response = await repositorio.deletePagamento(
            idCobranca, idPagamento);

        if (!response.sucesso || !response.doc) {
            return response;
        }

        return {
            sucesso: true,
            doc: response.doc
        };
    } catch (error) {
        return {
            sucesso: false,
            mensagem: trataException(error)
        }
    }
}
