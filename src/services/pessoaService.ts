// services/pessoaService.ts
import { convertDdMmYyyyToDate, formatDateDDMMAAAA } from '../utils/date';
import * as repositorio from '../respositories/pessoaRepository';
import { decripta, encripta } from '../utils/crypto';
import { IPessoa } from 'src/models/pessoa';
import { Decimal128, ObjectId } from 'mongoose';
import { IResultado } from 'src/models/resultado';

interface IPromocao {
    'data': Date, 
    'id_graduacao': ObjectId
}

interface IPagamento {
    'data': Date,
    'valor_devido': any,
    'valor_pago': Decimal128,
    'descricao': String,
    'observacoes': String
}

function setDoc(osDados: any): IPessoa {
    
    var totalPromocoes = osDados.total_promocoes;
    var totalPagamentos = osDados.total_pagamentos;

    //var doc = {};

    var doc_promocoes: IPromocao[] = [];
    if (totalPromocoes > 0) {
        for (var i=0; i<osDados.total_promocoes; i++) {
            var graduacao = osDados['id_graduacao_promocao_' + (i+1)];
            if (graduacao) {
                var doc_promocao = {
                    'data': convertDdMmYyyyToDate(
                        osDados['data_promocao_' + (i+1)]),
                    'id_graduacao': osDados['id_graduacao_promocao_' + (i+1)]
                }
                doc_promocoes.push(doc_promocao);
            }
        }
    }

    const doc: IPessoa = {
        'aniversario': osDados.aniversario,
        'matricula': osDados.matricula,
        'nome': osDados.nome==''?osDados.nome:encripta(osDados.nome),
        'situacao': osDados.situacao,
        'cpf': osDados.cpf===''?'':encripta(osDados.cpf),
        'data_inicio_aikido': osDados.data_inicio,
        'data_matricula': osDados.data_matricula,
        'tipo': osDados.tipo,
        'id_dojo': osDados.id_dojo == ''?null:osDados.id_dojo,
        'id_graduacao': osDados.id_graduacao,
        'promocoes': doc_promocoes,
    }

    return doc;
}

function decriptaCpf(cpf: any | null | undefined): string {
    if (cpf && cpf !== null && cpf !== undefined && cpf.length > 0) {
        return decripta(cpf);
    }
    return "";
}

function ordena(docs: any): any {
    docs.sort((a: { nome: string; }, b: { nome: string; }) => {
        var fa = a.nome.toLowerCase();
        var fb = b.nome.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });

    return docs;
}

export async function busca(oId: string): Promise<IResultado> {
    const id = oId;
    try {
        const response = await repositorio.find(id);
        if (!response.sucesso || !response.doc) return response;

        const  doc = response.doc;

        doc.nome = decripta(doc.nome);

        if (doc.cpf) doc.cpf = decriptaCpf(doc.cpf);
        if (doc.id_graduacao) doc.id_graduacao = doc.id_graduacao.toString();
        if (doc.id_dojo) doc.id_dojo = doc.id_dojo.toString();

        doc.promocoes.forEach(async (p: any) => {
            p.data_formatada = formatDateDDMMAAAA(p.data);
            if (p._id) {
                p._id = p._id.toString();
            }
        });


        if (doc.dojo.length == 0) {
            const dojo = {
                _id: null,
                nome: 'Nenhum dojo registrado',
            }
            doc.dojo.push(dojo)
        }

        return {
            sucesso: true,
            doc
        };
    } catch (error) {
        console.error(`Erro em busca(oId: ${oId}):`, error);
        
        return {
            sucesso: false,
            mensagem: `Erro ao buscar a pessoa de id ${id}`,
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
        };

    }
}

function processaElemento(elemento: any): any {
    elemento._id = elemento._id.toString();

    elemento.nome = decripta(elemento.nome);
    if (elemento.cpf) elemento.cpf = decriptaCpf(elemento.cpf);

    if (elemento.dojo.length == 0) {
        const dojo = {
            _id: null,
            nome: 'Nenhum dojo registrado',
        }
        elemento.dojo.push(dojo)
    }


    return elemento;

}

export async function buscaTodos(): Promise<IResultado> {
    try {
        const response = await repositorio.findAll();

        if (!response.sucesso || !Array.isArray(response.docs)) return response;

        const docsProcessados = response.docs.map((element: any) => {
            try {
                return processaElemento(element);
            } catch (error) {
                console.error('Erro ao processar a resposta:', error);

                return {
                    sucesso: false,
                    mensagem: 'Erro ao buscar todas as pessoas',
                    erro: error instanceof Error ? error.message : 'Erro desconhecido'
                };        
            }
        });

        return {
            sucesso: true,
            docs: ordena(docsProcessados)
        };
    } catch (error) {
        console.error('Erro ao buscar todas as pessaos:', error);

        return {
            sucesso: false,
            mensagem: 'Erro ao buscar todas as pessoas',
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}

export async function buscaAniversariantes(oMes: string): Promise<IResultado> {
    const mes = oMes;

    try {
        const response = await repositorio.findByAniversario(mes);

        if (!response.sucesso || !Array.isArray(response.docs)) return response;

        const docsProcessados = response.docs.map((element: any) => {
            try {
                return processaElemento(element);
            } catch (error) {
                console.error('Erro ao processar a resposta:', error);

                return {
                    sucesso: false,
                    mensagem: 'Erro ao buscar todas as pessoas',
                    erro: error instanceof Error ? error.message : 'Erro desconhecido'
                };        
            }
        });
        
        return {
            sucesso: true,
            docs: docsProcessados
        };
    } catch (error) {
        console.error(`Erro em buscaAniversariantes(oMes: ${mes}):`, error);
        
        return {
            sucesso: false,
            mensagem: `Erro ao buscar os aniversariantes do mês ${mes}`,
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}

export async function buscaSituacao(aSituacao: string): Promise<IResultado> {
    const situacao = aSituacao;
    try {
        const response: any = await repositorio.findBySituacao(situacao);
        if (!response.sucesso || !Array.isArray(response.docs)) return response;

        const docsProcessados = response.docs.map((element: any) => {
            try {
                return processaElemento(element);
            } catch (error) {
                console.error('Erro ao processar a resposta:', error);

                return {
                    sucesso: false,
                    mensagem: 'Erro ao buscar pela sitiacao',
                    erro: error instanceof Error ? error.message : 'Erro desconhecido',
                    situacao
                };        
            }
        });
        
        return {
            sucesso: true,
            docs: ordena(docsProcessados)
        };
    } catch (error) {
        console.error(`Erro em buscaSituacao(aSituacao: ${aSituacao}):`, error);
        
        return {
            sucesso: false,
            mensagem: `Erro ao buscar as pessoas ${situacao}`,
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}

export async function buscaProfessores(): Promise<IResultado> {
    try {
        //const resposta: any = await repositorio.findByIsProfessor(true);
        const response: any = await repositorio.findByTipo('professor');
        if (!response.sucesso || !Array.isArray(response.docs)) return response;

        const docsProcessados = response.docs.map((element: any) => {
            try {
                return processaElemento(element);
            } catch (error) {
                console.error('Erro ao processar a resposta:', error);

                return {
                    sucesso: false,
                    mensagem: 'Erro ao buscar os professores',
                    erro: error instanceof Error ? error.message : 'Erro desconhecido'
                };        
            }
        });
        
        return {
            sucesso: true,
            docs: ordena(docsProcessados)
        };
    } catch (error) {
        console.error(`Erro em buscaProfessores():`, error);
        
        return {
            sucesso: false,
            mensagem: `Erro ao buscar os professores`,
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
    const dados: IPessoa = setDoc(osDados);
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
    } catch (error: any) {
//        throw new Error(trataException(error));
        return {
            sucesso: false,
            mensagem: trataException(error)
        }
    }
}

export async function atualiza(oId: string, osDados: any): Promise<IResultado> {
    const id = oId;
    const dados = setDoc(osDados);

    try {
        const response = await repositorio.update(id, dados);

        if (!response.sucesso) {
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

