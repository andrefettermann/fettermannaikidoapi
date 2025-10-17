import * as assert from 'assert';
import { AfterAll, BeforeAll, Given, Then, When } from "@cucumber/cucumber";
import { connectDB, disconnectDB } from "../../src/db";
import * as servico from '../../src/services/cobrancaService'

var resposta: any;
var totalEsperado = 0;
var id = '';
var doc = {};

BeforeAll(async function() {
    await connectDB();
})

AfterAll(async function() {
    await disconnectDB();
})

Given('que nao existem cobrancas cadastradas', function () {
    totalEsperado = 0;
});

Given('que existem {int} cobrancas cadastradas', function (oTotal: number) {
    totalEsperado = oTotal;
});

Given('que existe a cobranca cadastrada com o id {string}', function(oId: string) {
    id = oId;
})

Given('que existem {int} cobrancas cadastradas para a pessoa com o id {string}', function(oTotal: number, oId: string) {
    id = oId;
    totalEsperado = oTotal;
})

Given('que existem {int} cobrancas cadastradas para a taxa com o id {string}', function(oTotal: number, oId: string) {
    id = oId;
    totalEsperado = oTotal;
})

Given('que a cobranca e informada sem a pessoa', function() {
    doc = {
        id_pessoa: '',
        id_taxa: '6876d21a80066b9538e06444',
        id_event: null,
        descricao: 'Teste integracao de alteracao',
        valor: '10.0',
        data_vencimento: '01/01/2001',
        data_emissao: '01/01/2001',
        situacao: 'pendente',
        periodo_referencia: '2025',
        observacoes: 'Teste integracao de alteracao'
    }
})

Given('que a cobranca e informada sem a taxa', function() {
    doc = {
        id_pessoa: '6876d21a80066b9538e06444',
        id_taxa: '',
        id_event: null,
        descricao: 'Teste integracao de alteracao',
        valor: '10.0',
        data_vencimento: '01/01/2001',
        data_emissao: '01/01/2001',
        situacao: 'pendente',
        periodo_referencia: '2025',
        observacoes: 'Teste integracao de alteracao'
    }
})

Given('que a cobranca e informada sem a data de vencimento', function() {
    doc = {
        id_pessoa: '6876d21a80066b9538e06444',
        id_taxa: '6876d21a80066b9538e06444',
        id_event: null,
        descricao: 'Teste integracao de alteracao',
        valor: '10.0',
        data_vencimento: '',
        data_emissao: '01/01/2001',
        situacao: 'pendente',
        periodo_referencia: '2025',
        observacoes: 'Teste integracao de alteracao'
    }
})

Given('que a cobranca e informada sem a data de emissao', function() {
    doc = {
        id_pessoa: '6876d21a80066b9538e06444',
        id_taxa: '6876d21a80066b9538e06444',
        id_event: null,
        descricao: 'Teste integracao de alteracao',
        valor: '10.0',
        data_vencimento: '01/01/2001',
        data_emissao: '',
        situacao: 'pendente',
        periodo_referencia: '2025',
        observacoes: 'Teste integracao de alteracao'
    }
})

Given('que a cobranca e informada corretamente', function() {
    doc = {
        id_pessoa: '6876d21a80066b9538e06444',
        id_taxa: '68e835da579cd77bc6206924',
        id_event: null,
        descricao: 'Pagamento em parcela única',
        valor: '200.0',
        data_vencimento: '30/04/2025',
        data_emissao: '01/04/2025',
        situacao: 'pago',
        periodo_referencia: '2025',
        observacoes: 'Teste integracao de alteracao'
    }
})

Given('que a cobranca e alterada corretamente', function() {
    doc = {
        id_pessoa: '6876d21a80066b9538e06444',
        id_taxa: '68e835da579cd77bc6206924',
        id_event: null,
        descricao: 'Pagamento em parcela única',
        valor: '200.0',
        data_vencimento: '30/04/2025',
        data_emissao: '01/04/2025',
        situacao: 'pago',
        periodo_referencia: '2025',
        observacoes: 'Teste de integracao de alteracao'
    }
})

When('buscar as cobrancas cadastradas', async function () {
    resposta = await servico.buscaTodos();
});

When('e solicitado buscar esta cobranca', async function () {
    resposta = await servico.busca(id);
});

When('buscar as cobrancas cadastradas para a pessoa', async function () {
    resposta = await servico.buscaPorPessoa(id);
});

When('buscar as cobrancas cadastradas para a taxa', async function () {
    resposta = await servico.buscaPorTaxa(id);
});

When('incluir a cobranca', async function () {
    try {
        resposta = await servico.inclui(doc);
    } catch (error) {
        resposta = error;
    }
});

When('gravar a alteracao da cobranca', async function () {
    try {
        resposta = await servico.atualiza(id, doc);
    } catch (error) {
        resposta = error;
    }
});

Then('deveriam ser retornadas todas as cobrancas cadastradas', function () {
    assert.equal(resposta.docs.length, totalEsperado);
});

Then('nao deveriam ser retornadas cobrancas cadastradas', function () {
    assert.equal(resposta.docs.length, totalEsperado);
});

Then('deveriam ser retornadas todas as cobrancas cadastradas para a pessoa', function () {
    assert.equal(resposta.docs.length, totalEsperado);
});

Then('deveriam ser retornadas todas as cobrancas cadastradas para a taxa', function () {
    assert.equal(resposta.docs.length, totalEsperado);
});

Then('deveria ser retornada a cobranca solicitada', function () {
    //assert.equal(id, resposta.doc._id);
    assert.equal(resposta.sucesso, true);
});

Then('deveria ser informado que a pessoa da cobranca e obrigatoria', function() {
    assert.equal(resposta.mensagem, 'A pessoa é obrigatória.');
})

Then('deveria ser informado que a taxa da cobranca e obrigatoria', function() {
    assert.equal(resposta, 'A taxa é obrigatória.');
})

Then('deveria ser informado que a data de vencimento da cobranca e obrigatoria', function() {
    assert.equal(resposta, 'A data de vencimento é obrigatória.');
})

Then('deveria ser informado que a data de emissao da cobranca e obrigatoria', function() {
    assert.equal(resposta, 'A data de emissão é obrigatória.');
})

Then('a cobranca deveria ser incluida', function() {
    assert.equal(resposta.sucesso, true);
})

Then('a cobranca deveria ser alterada', function() {
    assert.equal(resposta.sucesso, true);
})
