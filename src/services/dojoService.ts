// services/dojoService.ts
import { IDojo } from '../models/dojo';
import * as repositorio from '../respositories/dojoRepository';
import { decripta } from '../utils/crypto';
import { IResultado } from '../models/resultado'


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
        'id_professor': osDados.id_professor==""?null:osDados.id_professor,
        'horarios': osDados.horarios,
        'is_ativo': osDados.is_ativo?true:false
    };

    return dojo;
}

export async function busca(oId: string): Promise<IResultado> {
    const id = oId;
    try {
        const response = await repositorio.find(id);
        if (!response.sucesso || !response.doc) return response;

        const doc = response.doc;

        if (doc.id_professor) {
            doc.id_professor = doc.id_professor.toString();
        }

        if (Array.isArray(doc.professor) && doc.professor[0]?.nome) {
            try {
                doc.professor[0].nome = decripta(doc.professor[0].nome);
            } catch (_) {}
        }

        if (Array.isArray(doc.alunos)) {
            doc.alunos.forEach((a: any) => {
                if (a?.nome) {
                    try { a.nome = decripta(a.nome); } catch (_) {}
                }
            });
        }

        return { sucesso: true, doc };
    } catch (error) {
        throw error;
    }
}

export async function buscaTodos(): Promise<IResultado> {
    try {
        const response: IResultado = await repositorio.findAll();
        if (!response.sucesso || !Array.isArray(response.docs)) return response;

        response.docs.forEach((element: any) => {
            if (element.id_professor) {
                element.id_professor = element.id_professor.toString();
            }
            if (Array.isArray(element.professor)) {
                element.professor.forEach((p: any) => {
                    if (p?.nome) {
                        try { p.nome = decripta(p.nome); } catch (_) {}
                    }
                });
            }
        });

        return { sucesso: true, docs: response.docs };
    } catch (error) {
        throw error;
    }
}

export async function buscaAtivos(): Promise<IResultado> {
    try {
        const response: IResultado = await repositorio.findByIsAtivo(true);
        if (!response.sucesso || !Array.isArray(response.docs)) return response;

        response.docs.forEach((element: any) => {
            if (element.id_professor) {
                element.id_professor = element.id_professor.toString();
            }
            if (Array.isArray(element.professor)) {
                element.professor.forEach((p: any) =>{
                    if (p?.nome) {
                        try { p.nome = decripta(p.nome); } catch (_) {}
                    }
                })
            }
        });

        return { sucesso: true, docs: response.docs };
    } catch (error) {
        throw error;
    }
}

export async function buscaInativos(): Promise<IResultado> {
    try {
        const response = await repositorio.findByIsAtivo(false);
        
        if (!response.sucesso) {
            return {
                sucesso: false,
                mensagem: response.mensagem || 'Erro ao buscar registros inativos',
                erro: response.erro
            };
        }

        // Validação adicional
        if (!Array.isArray(response.docs)) {
            return {
                sucesso: false,
                mensagem: 'Formato de resposta inválido'
            };
        }

        // Processamento com tratamento de erros
        const docsProcessados = response.docs.map((element: any) => {
            try {
                if (element.id_professor) {
                    element.id_professor = element.id_professor.toString();
                }
                
                if (Array.isArray(element.professor)) {
                    element.professor = element.professor.map((p: any) => {
                        if (p.nome) {
                            try {
                                p.nome = decripta(p.nome);
                            } catch (erroDecripta) {
                                console.error('Erro ao decriptar nome:', erroDecripta);
                                // Mantém o valor original ou define um padrão
                                //p.nome = '[Erro na descriptografia]';
                            }
                        }
                        return p;
                    });
                }
                
                return element;
            } catch (erroProcessamento) {
                console.error('Erro ao processar documento:', erroProcessamento);
                return element; // Retorna documento original em caso de erro
            }
        });

        return {
            sucesso: true,
            docs: docsProcessados
        };
        
    } catch (error) {
        console.error('Erro em buscaInativos:', error);
        
        return {
            sucesso: false,
            mensagem: 'Erro ao buscar registros inativos',
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
    const dados: IDojo = setDoc(osDados);

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
//        throw new Error(trataException(error));
        return {
            sucesso: false,
            mensagem: trataException(error)
        }
    }
}

