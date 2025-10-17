// src/services/taxaService.ts
import { IGraduacao } from 'src/models/graduacao';
import * as repositorio from '../respositories/graduacaoRepository';
import { decripta } from '../utils/crypto';

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

export async function busca(oId: string) {
    const id = oId;
    try {
        const result: any = await repositorio.find(id);
        if (result.sucesso) {
            result.doc.pessoas.forEach((a: any) => {
                a.nome = decripta(a.nome);
            });

            return {
                sucesso: true,
                doc: result.doc
            };
        } else {
            throw result.error;
        }        
    } catch (error) {
        throw error;
    }
}

export async function buscaTodos() {
    try {
        const result: any = await repositorio.findAll();
        if (result.sucesso) {

            result.docs.forEach((g: any) => {
                g._id = g._id.toString();
            })

            result.docs.sort((a: { ordem: number; }, b: { ordem: number; }) => {
                //var fa = a.nome.toLowerCase();
                //var fb = b.nome.toLowerCase();

                if (a.ordem < b.ordem) {
                    return -1;
                }
                if (a.ordem > b.ordem) {
                    return 1;
                }
                return 0;
            });
            return {
                sucesso: true,
                docs: result.docs
            };
        } else {
            throw result.error;
        }        
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

export async function inclui(osDados: any) {
    const dados: IGraduacao = setDoc(osDados);
    try {
        return await repositorio.insert( dados);
    } catch (error) {
        throw new Error(trataException(error));
    }
}

export async function atualiza(oId: string, osDados: any) {
    const id = oId;
    const dados: IGraduacao = setDoc(osDados) ;

    try {
        return await repositorio.update(id, dados);
    } catch (error) {
        throw new Error(trataException(error));
    }
}