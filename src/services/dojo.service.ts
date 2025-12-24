// src/services/dojo.service.ts
import { IDojo } from '../models/dojo';
import * as repositorio from '../repositories/dojo.repository';
import { decripta } from '../utils/crypto';
import { IResultado } from '../models/resultado'
import * as pessoaService from './pessoa.service';


function setDoc(osDados: any): IDojo {
    var dojo: IDojo = {
        'nome': osDados.nome,
        'local': osDados.local,
        'endereco': osDados.endereco,
        'bairro': osDados.bairro,
        'cidade': osDados.cidade,
        'uf': osDados.uf,
        'pais': osDados.pais,
        'url': osDados.url,
        'email': osDados.email,
        'is_ativo': osDados.is_ativo?true:false,
        professores: osDados.professores ? osDados.professores : []
    };

    return dojo;
}

export async function busca(oId: string): Promise<IResultado> {
    const id = oId;
    try {
        const resposta = await repositorio.find(id);
        
        if (!resposta.sucesso || !resposta.doc) return resposta;

        if (Array.isArray(resposta.doc.professores)) {
            for (const p of resposta.doc.professores) {
                const res = await pessoaService.busca(p.id_professor);
                if (res.sucesso && res.doc) {
                    p.nome = res.doc.nome || ''; 
                }
            };

        }

        if (Array.isArray(resposta.doc.alunos)) {
            resposta.doc.alunos.forEach((a: any) => {
                if (a?.nome) {
                    try { 
                        a.nome = decripta(a.nome); 
                    } catch (error) {
                        return {
                            sucesso: false,
                            mensagem: 'Erro descriptografar nome do aluno',
                            erro: error instanceof Error ? error.message : 'Erro desconhecido'
                        };  
                    }
                }
            });
        }

        return { sucesso: true, doc: resposta.doc };
    } catch (error) {
        return {
            sucesso: false,
            mensagem: 'Erro desconhecido ao buscar o dojo pelo id',
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}

export async function buscaTodos(): Promise<IResultado> {
    try {
        const response: IResultado = await repositorio.findAll();
        if (!response.sucesso || !Array.isArray(response.docs)) return response;

        const docs: any[] = [];

        // Processa cada dojo
        for (const doc of response.docs) {
            // Busca e atribui o nome do professor
            if (Array.isArray(doc.professores)) {
                for (const p of doc.professores) {
                    const res = await pessoaService.busca(p.id_professor);
                    if (res.sucesso && res.doc) {
                        p.nome = res.doc.nome || ''; 
                    }
                };
            }
            docs.push(doc);
        }

        return { sucesso: true, docs };
    } catch (error) {
        return {
            sucesso: false,
            mensagem: 'Erro desconhecido ao buscar todos os dojos',
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}

export async function buscaAtivos(): Promise<IResultado> {
    try {
        const response: IResultado = await repositorio.findByIsAtivo(true);
        if (!response.sucesso || !Array.isArray(response.docs)) return response;

        const docs: any[] = [];

        // Processa cada dojo
        for (const doc of response.docs) {
            // Busca e atribui o nome do professor
            if (Array.isArray(doc.professores)) {
                for (const p of doc.professores) {
                    const res = await pessoaService.busca(p.id_professor);
                    if (res.sucesso && res.doc) {
                        p.nome = res.doc.nome || ''; 
                    }
                };
            }
            docs.push(doc);
        }

        return { sucesso: true, docs };
    } catch (error) {
        return {
            sucesso: false,
            mensagem: 'Erro desconhecido ao buscar os dojos ativos',
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}

export async function buscaInativos(): Promise<IResultado> {
    try {
        const response: IResultado = await repositorio.findByIsAtivo(false);
        if (!response.sucesso || !Array.isArray(response.docs)) return response;

        const docs: any[] = [];

        // Processa cada dojo
        for (const doc of response.docs) {
            // Busca e atribui o nome do professor
            if (Array.isArray(doc.professores)) {
                for (const p of doc.professores) {
                    const res = await pessoaService.busca(p.id_professor);
                    if (res.sucesso && res.doc) {
                        p.nome = res.doc.nome || ''; 
                    }
                };
            }
            docs.push(doc);
        }

        return { sucesso: true, docs };
    } catch (error) {
        return {
            sucesso: false,
            mensagem: 'Erro desconhecido ao buscar os dojos ativos',
            erro: error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }

}

function trataException(exception: any): string {
    if (exception.name === 'ValidationError') {
        // Para um campo específico
        const mensagemNome = exception.errors.nome?.message;
        //console.log(mensagemNome); // "O nome é obrigatório"
        return mensagemNome;
        
        // Ou percorrer todos os erros
        /*
        Object.keys(exception.errors).forEach(campo => {
            console.log(exception.errors[campo].message);
        });
        */
    }    
    return '';
}

export async function inclui(osDados: any): Promise<IResultado> {
    const dados: IDojo = setDoc(osDados);
    try {
        const response = await repositorio.insert(dados);
        if (!response) {
            return {
                sucesso: false,
                mensagem: 'Erro ao incluir os dados',
                erro: 'Erro desconhecido'
            };
        }

        return {
            sucesso: true,
            doc: response.doc
        };
    } catch (error: any) {
        return {
            sucesso: false,
            mensagem: trataException(error)
        }
    }
}

export async function atualiza(oId: string, osDados: any): Promise<IResultado> {
    const id = oId;
    const dados: IDojo = setDoc(osDados);

    try {
        const response = await repositorio.update(id, dados);
        if (!response.sucesso) {
            return {
                sucesso: false,
                mensagem: 'Erro ao atualizar os dados',
                erro: 'Erro desconhecido'
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

export async function incluiProfessor(oId: string, osDados: any): Promise<IResultado> {
    const id = oId;    
    try {
        const response = await repositorio.addProfessor(id, osDados);
        if (!response.sucesso) {
            return {
                sucesso: false,
                mensagem: 'Erro ao incluir o professor',
                erro: 'Erro desconhecido'
            };
        }

        return {
            sucesso: true,
            doc: response.doc
        };
    } catch (error) {
        console.log('erro incluiProfessor service', error);
        return {
            sucesso: false,
            mensagem: trataException(error)
        }
    }
}