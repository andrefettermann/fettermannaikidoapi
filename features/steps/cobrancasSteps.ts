import * as assert from 'assert';
import { AfterAll, BeforeAll, Given, Then, When } from "@cucumber/cucumber";
import { connectDB, disconnectDB } from "../../src/db";
import * as servico from '../../src/services/cobrancaService'
import { IResultado } from '../../src/models/resultado';

var resposta: IResultado;
var totalEsperado = 0;
var idCobranca = '';
var idPagamento = ''
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
    idCobranca = oId;
})

Given('que existem {int} cobrancas cadastradas para a pessoa com o id {string}', function(oTotal: number, oId: string) {
    idCobranca = oId;
    totalEsperado = oTotal;
})

Given('que existem {int} cobrancas cadastradas para a taxa com o id {string}', function(oTotal: number, oId: string) {
    idCobranca = oId;
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
});

Given('que o pagamento nao e informado', function() {
    idPagamento = ''
});

Given('que e informado um pagamento nao cadastrado', function() {
    idPagamento = '1234567890abcdef12345678';
});

Given('que existe um pagamento desta cobranca cadastrado com o id {string}', function(oId: string) {
    idPagamento = oId;
});

/**
 * When
 */

When('buscar as cobrancas cadastradas', async function () {
    resposta = await servico.buscaTodos();
});

When('e solicitado buscar esta cobranca', async function () {
    resposta = await servico.busca(idCobranca);
});

When('buscar as cobrancas cadastradas para a pessoa', async function () {
    resposta = await servico.buscaPorPessoa(idCobranca);
});

When('buscar as cobrancas cadastradas para a taxa', async function () {
    resposta = await servico.buscaPorTaxa(idCobranca);
});

When('incluir a cobranca', async function () {
    resposta = await servico.inclui(doc);
});

When('gravar a alteracao da cobranca', async function () {
    resposta = await servico.atualiza(idCobranca, doc);
});

When('e solicitado excluir o pagamento', async function() {
    resposta = await servico.excluiPagamento(idCobranca, idPagamento);
});

/**
 * Then
 */

Then('deveriam ser retornadas todas as cobrancas cadastradas', function () {
    assert.equal(resposta.docs?.length, totalEsperado);
});

Then('nao deveriam ser retornadas cobrancas cadastradas', function () {
    assert.equal(resposta.docs?.length, totalEsperado);
});

Then('deveriam ser retornadas todas as cobrancas cadastradas para a pessoa', function () {
    assert.equal(resposta.docs?.length, totalEsperado);
});

Then('deveriam ser retornadas todas as cobrancas cadastradas para a taxa', function () {
    assert.equal(resposta.docs?.length, totalEsperado);
});

Then('deveria ser retornada a cobranca solicitada', function () {
    assert.equal(resposta.sucesso, true);
});

Then('deveria ser informado que a pessoa da cobranca e obrigatoria', function() {
    assert.equal(resposta.mensagem, 'A pessoa é obrigatória.');
});

Then('deveria ser informado que a taxa da cobranca e obrigatoria', function() {
    assert.equal(resposta.mensagem, 'A taxa é obrigatória.');
});

Then('deveria ser informado que a data de vencimento da cobranca e obrigatoria', function() {
    assert.equal(resposta.mensagem, 'A data de vencimento é obrigatória.');
});

Then('deveria ser informado que a data de emissao da cobranca e obrigatoria', function() {
    assert.equal(resposta.mensagem, 'A data de emissão é obrigatória.');
});

Then('deveria ser informado que o pagamento e obrigatorio', function() {
    assert.equal(resposta.mensagem, 'O pagamento é obrigatório.');
});

Then('deveria ser informado que o pagamento nao esta cadastrado', function() {
    assert.equal(resposta.erro, 'Pagamento não encontrado.');
});

Then('a cobranca deveria ser incluida', function() {
    assert.equal(resposta.sucesso, true);
});

Then('a cobranca deveria ser alterada', function() {
    assert.equal(resposta.sucesso, true);
});

Then('o pagamento everia ser excluido com sucesso', function() {
    assert.equal(resposta.sucesso, true);
});
