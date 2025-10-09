// services/taxaService.ts
import { ITaxa } from 'src/models/taxa';
import * as repositorio from '../respositories/taxaRepository';

function setDoc(osDados: any): ITaxa {
    var taxa: ITaxa = {
        'tipo': osDados.tipo,
        'nome': osDados.nome,
        'descricao': osDados.descricao,
        'is_ativa': osDados.is_ativa?true:false,
        'is_recorrente': osDados.is_recorrente?true:false,
        'periodicidade': osDados.periodicidade,
        'valor_padrao': osDados.valor_padrao?osDados.valor_padrao:0.0
    };

    return taxa;
}

export async function busca(oId: string): Promise<any> {
    const id = oId;
    try {
        return await repositorio.find(id);
    } catch (error) {
        throw error;
    }
}

export async function buscaTodos(): Promise<any> {
    try {
        return await repositorio.findAll();
    } catch (error) {
        throw error;
    }
}

export async function inclui(osDados: any): Promise<any> {
    const dados: ITaxa = setDoc(osDados);
    try {
        return await repositorio.insert(dados);
    } catch (error) {
        throw error;
    }
}

export async function atualiza(oId: string, osDados: any): Promise<any> {
    const id = oId;
    const dados = setDoc(osDados);

    try {
        return await repositorio.update(id, dados);
    } catch (error) {
        throw error;
    }

}

