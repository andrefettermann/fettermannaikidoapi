// src/services/graduacao.service.ts
import { IGraduacao } from 'src/models/graduacao';
import * as repositorio from '../repositories/graduacao.repository';
import * as pessoaRepositorio from '../repositories/pessoa.repository';
import { decripta } from '../utils/crypto';
import { IResultado } from '../models/resultado'

interface ITecnica {
    nome: string
}

function setDoc(osDados: any): IGraduacao {
    var totalTecnicas = osDados.total_tecnicas;
    var doc_tecnicas: ITecnica[] = [];
    if (totalTecnicas > 0) {
        for (var i=0; i<osDados.total_tecnicas; i++) {
            var nome = osDados['nome_' + (i+1)];
            var doc_tecnica = { nome  };
            doc_tecnicas.push(doc_tecnica);
        }
    }
    
    var doc: IGraduacao = {
        'sequencia': osDados.sequencia?parseInt(osDados.sequencia):osDados.sequencia,
        'nome': osDados.nome,
        'faixa': osDados.faixa,
        'minimo_horas_treino_exame': parseInt(osDados.horas_exame),
        'minimo_tempo_exame': parseInt(osDados.meses_exame),
        'categoria': osDados.categoria,
        'observacoes': osDados.observacoes,
        'tecnicas': doc_tecnicas
    }

    return doc;
}

export async function busca(oId: string): Promise<IResultado> {
    const id = oId;
    try {
        const response = await repositorio.find(id);
        if (!response.sucesso || !response.doc) return response;

        const doc = response.doc;

        if (Array.isArray(doc.pessoas)) {
            doc.pessoas.forEach((a: any) => {
                if (a?.nome) {
                    try { a.nome = decripta(a.nome); } catch (_) {}
                }
            });
        }

        return { sucesso: true, doc }
    } catch (error) {
        return {
            sucesso: false,
            mensagem: 'Erro desconhecido ao buscar a graduacao pelo id',
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}

export async function buscaTodos(): Promise<IResultado> {
    try {
        const response = await repositorio.findAll();
        if (!response.sucesso || !Array.isArray(response.docs)) return response;


        if (Array.isArray(response.docs)) {
            response.docs.forEach((g: any) => {
                g._id = g._id.toString();
            })

            response.docs.sort((a: { ordem: number; }, b: { ordem: number; }) => {
                if (a.ordem < b.ordem) {
                    return -1;
                }
                if (a.ordem > b.ordem) {
                    return 1;
                }
                return 0;
            });
        }

        return {
            sucesso: true,
            docs: response.docs
        };
    } catch (error) {
        return {
            sucesso: false,
            mensagem: 'Erro desconhecido ao buscar todas as graduacoes',
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
    const dados: IGraduacao = setDoc(osDados);
    try {
        const response = await repositorio.insert( dados);
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
        return {
            sucesso: false,
            mensagem: trataException(error)
        }
    }
}

export async function atualiza(oId: string, osDados: any): Promise<IResultado> {
    const id = oId;
    const dados: IGraduacao = setDoc(osDados) ;

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

export async function exclui(oId: string): Promise<IResultado> {
    const id = oId;
    if (!id || id == '') {
        return {
            sucesso: false,
            mensagem: 'Informe a graduação a ser excluída.'
        }
    }

    try {
        var response = await pessoaRepositorio.findByIdGraduacao(id);
        if (response.sucesso && Array.isArray(response.docs) && response.docs.length > 0) {
            return {
                sucesso: false,
                mensagem: 'Não é possível excluir graduação com pessoas associadas.'
            }
        }

        response = await repositorio.remove(id);
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