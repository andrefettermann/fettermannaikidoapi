// services/dojoService.ts
import { IDojo } from 'src/models/dojo';
import * as repositorio from '../respositories/dojoRepository';
import { decripta } from '../utils/crypto';

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

export async function busca(oId: string): Promise<any> {
    const id = oId;
    try {
        const response: any = await repositorio.find(id);
        if (response.sucesso) {

            if (response.doc.id_professor) {
                response.doc.id_professor = response.doc.id_professor.toString();
            }
            
            if (response.doc.professor[0]) {
                response.doc.professor[0].nome = 
                    decripta(response.doc.professor[0].nome);
            }

            response.doc.alunos.forEach((a: any) => {
                a.nome = decripta(a.nome);
            })

            return {
                sucesso: true,
                doc: response.doc
            };
        } else {
            return response;
        }        
    } catch (error) {
        throw error;
    }
}

export async function buscaTodos(): Promise<any> {
    try {
        const resposta = await repositorio.findAll();
        if (resposta.sucesso) {
            resposta.docs.forEach((element: any) => {
                if (element.id_professor) {
                    element.id_professor = element.id_professor.toString();
                }

                element.professor.forEach((p: any) =>{
                    if (p.nome) p.nome = decripta(p.nome);
                })
            });

            return {
                sucesso: true,
                docs: resposta.docs
            };
        } else {
            return resposta;
        }        
    } catch (error) {
        throw error;
    }
}

export async function buscaAtivos(): Promise<any> {
    try {
        const resposta = await repositorio.findByIsAtivo(true);
        if (resposta.sucesso) {
            resposta.docs.forEach((element: any) => {
                if (element.id_professor) {
                    element.id_professor = element.id_professor.toString();
                }

                element.professor.forEach((p: any) =>{
                    if (p.nome) p.nome = decripta(p.nome);
                })
            });

            return {
                sucesso: true,
                docs: resposta.docs
            };
        } else {
            return resposta;
        }        
    } catch (error) {
        throw error;
    }
}

export async function buscaInativos(): Promise<any> {
    try {
        const resposta = await repositorio.findByIsAtivo(false);
        if (resposta.sucesso) {
            resposta.docs.forEach((element: any) => {
                if (element.id_professor) {
                    element.id_professor = element.id_professor.toString();
                }

                element.professor.forEach((p: any) =>{
                    if (p.nome) p.nome = decripta(p.nome);
                })
            });

            return {
                sucesso: true,
                docs: resposta.docs
            };
        } else {
            return resposta;
        }        
    } catch (error) {
        throw error;
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

export async function inclui(osDados: any): Promise<any> {
    const dados: IDojo = setDoc(osDados);
    try {
        return await repositorio.insert(dados);
    } catch (error: any) {
        throw new Error(trataException(error));
        //throw error;
    }
}

export async function atualiza(oId: string, osDados: any): Promise<any> {
    const id = oId;
    const dados: IDojo = setDoc(osDados);

    try {
        const resposta: any = await repositorio.update(id, dados);
        return resposta;
    } catch (error) {        
        throw new Error(trataException(error));
    }

}

