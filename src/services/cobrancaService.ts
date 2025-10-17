// src/services/cobrancaService.ts
import { convertDdMmYyyyToDate, formatDateDDMMAAAA } from '../utils/date';
import { ICobranca } from '../models/cobranca';
import * as repositorio from '../respositories/cobrancaRepository';
import { decripta } from '../utils/crypto';

function setDocCobranca(osDados: any): any {
    var doc =  {
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

export async function busca(oId: string): Promise<any> {
    const id = oId;
    try {
        const resposta: any = await repositorio.find(id);
        resposta.doc.pessoa.nome = decripta(resposta.doc.pessoa.nome);
        return resposta;
    } catch (error) {
        throw error;
    }
}
export async function buscaTodos(): Promise<any> {
    try {
        const resposta = await repositorio.findAll();

        if (resposta.sucesso) {
            resposta.docs.forEach((doc: any) => {
                if (doc.pessoa.nome) 
                    doc.pessoa.nome = decripta(doc.pessoa.nome);
            });

            return {
                sucesso: true,
                docs: resposta.docs
            };
        } else {
            return resposta;
        }        
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function buscaPorPessoa(oId: string): Promise<any> {
    const id = oId;
    try {
        const resposta = await repositorio.findByIdPessoa(id);

        if (resposta.sucesso) {
            resposta.docs.forEach((doc: any) => {
                if (doc.pessoa.nome) 
                    doc.pessoa.nome = decripta(doc.pessoa.nome);
            });

            return {
                sucesso: true,
                docs: resposta.docs
            };
        } else {
            return resposta;
        }        
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function buscaPorTaxa(oId: string): Promise<any> {
    const id = oId;
    try {
        const resposta = await repositorio.findByIdTaxa(id);
        if (resposta.sucesso) {
            resposta.docs.forEach((doc: any) => {
                if (doc.pessoa.nome) 
                    doc.pessoa.nome = decripta(doc.pessoa.nome);
            });

            return {
                sucesso: true,
                docs: resposta.docs
            };
        } else {
            return resposta;
        }        
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function buscaPorPagamento(oId: string): Promise<any> {
    const id = oId;
    try {
        const resposta = await repositorio.findByIdPagamento(id);
        if (resposta.sucesso) {
            if (resposta.doc.pessoa.nome) 
                resposta.doc.pessoa.nome = decripta(resposta.doc.pessoa.nome);

            return {
                sucesso: true,
                doc: resposta.doc
            };
        } else {
            return resposta;
        }        
    } catch (error: any) {
        console.error(error)
        throw new Error(error.message);
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

export async function inclui(osDados: any): Promise<any> {
    const dados: ICobranca = setDocCobranca(osDados);
    try {
        return await repositorio.insert(dados);
    } catch (error) {
        throw {sucesso: false, mensagem: trataException(error)};
    }
}

export async function atualiza(oId: string, osDados: any): Promise<any> {
    const id = oId;
    const dados: ICobranca = setDocCobranca(osDados);
    try {
        const resposta = await repositorio.update(id, dados);
        return resposta
    } catch (error) {
        throw new Error(trataException(error));
    }
}

export async function incluiPagamento(oId: string, osDados: any): Promise<any> {
    const dados = setDocPagamento(osDados);
    const id = oId;
    try {
        const resposta = await repositorio.insertPagamento(id, dados);
        return resposta;
    } catch (error) {
        console.log(error)
        throw {sucesso: false, mensagem: trataException(error)};
    }
}

export async function atualizaPagamento(osDados: any): Promise<any> {
    const dados = setDocPagamento(osDados);
    try {
        const resposta = await repositorio.updatePagamento(
            osDados.id_cobranca, osDados.id_pagamento, dados);
        return resposta;
    } catch (error) {
        console.log(error)
        throw {sucesso: false, mensagem: trataException(error)};
    }
}
