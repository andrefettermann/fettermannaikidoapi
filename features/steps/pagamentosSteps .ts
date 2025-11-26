// features/steps/pagamentosSteps.ts
import * as assert from 'assert';
import { AfterAll, BeforeAll, Given, Then, When } from "@cucumber/cucumber";
import { connectDB, disconnectDB } from "../../src/db";
import * as servico from '../../src/services/cobranca.service'

var resposta: any;
var totalEsperado = 0;
var idPagamento = '';
var idCobranca = '';
var doc = {};

BeforeAll(async function() {
    await connectDB();
})

AfterAll(async function() {
    await disconnectDB();
})

Given('um pagamento para uma cobranca cadastrada com o id {string}', function (oId: string) {
    idCobranca = oId;
});

Given('que este pagamento e informado sem o valor pago', function() {
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

Given('que este pagamento e informado corretamente', function() {
    doc = {
        valor_pago: '200.0',
        data_pagamento: '30/04/2025',
        forma_pagamento: 'pix',
        comprovante: '',
        desconto: '0.0',
        juros: '0.0',
        observacoes: 'Teste integracao de inclusao'
    }
})

When('incluir o pagamento', async function () {
    try {
        resposta = await servico.incluiPagamento(idCobranca, doc);
    } catch (error: any) {
        resposta = error;
    }
});

Then('deveria ser informado que o valor do pagamento e obrigatorio', function() {
    assert.equal(resposta.mensagem, 'O valor do pagamento e obrigatório.');
})

Then('o pagamento deveria ser incluido', function() {
    assert.equal(resposta.sucesso, true);
})

Then('o pagamento deveria ser alterado', function() {
    assert.equal(resposta.sucesso, true);
})
