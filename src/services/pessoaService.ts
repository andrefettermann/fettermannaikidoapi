// services/pessoaService.ts
import { convertDdMmYyyyToDate, formatDateDDMMAAAA } from '../utils/date';
import * as repositorio from '../respositories/pessoaRepository';
import { decripta, encripta } from '../utils/crypto';

function setDoc(osDados: any) {
    var totalPromocoes = osDados.total_promocoes;
    var totalPagamentos = osDados.total_pagamentos;

    var doc = {};

    var doc_promocoes = [];
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

    var doc_pagamentos = [];
    if (totalPagamentos > 0) {
        for (var i=0; i<osDados.total_pagamentos; i++) {
            let data = osDados['data_pagamento_' + (i+1)];
            if (data) {
                var doc_pagamento = {
                    'data': convertDdMmYyyyToDate(
                        osDados['data_pagamento_' + (i+1)]),
                    'valor_pago': Number.parseFloat(
                        osDados['valor_pagamento_' + (i+1)]),
                    'descricao': osDados['descricao_pagamento_' + (i+1)]
                }
                doc_pagamentos.push(doc_pagamento);
            }
        }
    }

    doc = {
        'aniversario': osDados.aniversario,
        'matricula': osDados.matricula,
        'nome': osDados.nome,
        'situacao': osDados.situacao,
        'cpf': osDados.cpf===''?'':osDados.cpf,
        'data_inicio_aikido': osDados.data_inicio,
        'data_matricula': osDados.data_matricula,
        'is_professor': osDados.is_professor?true:false,
        'id_dojo': osDados.id_dojo == ''?null:osDados.id_dojo,
        'id_graduacao': osDados.id_graduacao,
        'promocoes': doc_promocoes,
        'pagamentos': doc_pagamentos
    }

    return doc;
}

function decriptaCpf(cpf: any | null | undefined): string {
    if (cpf && cpf !== null && cpf !== undefined && cpf.length > 0) {
        return decripta(cpf);
    }
    return "";
}

export async function buscaTodos(): Promise<any> {
    try {
        const resposta: any = await repositorio.findAll();
        
        if (resposta.sucesso) {
            resposta.docs.forEach((doc: any) => {
                doc._id = doc._id.toString();
                doc.nome = decripta(doc.nome);
                doc.cpf = decriptaCpf(doc.cpf);
            });

            resposta.docs.sort((a: { nome: string; }, b: { nome: string; }) => {
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

            return {
                sucesso: true,
                docs: resposta.docs
            };
        } else {
            return {
                sucesso: false,
                erro: resposta.erro
            };
        }        
    } catch (error) {
        throw error;
    }
}
