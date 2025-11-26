import * as assert from 'assert';
import { AfterAll, BeforeAll, Given, Then, When } from "@cucumber/cucumber";
import { connectDB, disconnectDB } from "../../src/db";
import * as servico from '../../src/services/taxa.service'

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

Given('que existem {int} taxas cadastradas', function (oTotal: number) {
    totalEsperado = oTotal;
});

Given('que existe a taxa cadastrada com o id {string}', function(oId: string) {
    id = oId;
})

Given('que a taxa e informada sem o tipo', function() {
    doc = {
      tipo: '',
      nome: 'Teste de inclusao unitario',
      descricao: 'Teste de inclusao unitario',
      valor_padrao: '0',
      is_recorrente: 'true',
      is_ativa: 'true',
      periodicidade: 'anual'
    };
})

Given('que a taxa e informada sem o nome', function() {
    doc = {
      tipo: 'anuidade',
      nome: '',
      descricao: 'Teste de inclusao',
      valor_padrao: '0',
      is_recorrente: 'true',
      is_ativa: 'true',
      periodicidade: 'anual'
    };
})

Given('que a taxa e informada corretamente', function() {
    doc = {
      tipo: 'anuidade',
      nome: 'Teste de inclusao',
      descricao: 'Teste de inclusao',
      valor_padrao: '0',
      is_recorrente: 'true',
      is_ativa: 'true',
      periodicidade: 'anual'
    };
})

Given('que a taxa e alterada corretamente', function() {
    doc = {
      tipo: 'anuidade',
      nome: 'Teste de alteracao',
      descricao: 'Teste de alteracao',
      valor_padrao: '0',
      is_recorrente: 'true',
      is_ativa: 'true',
      periodicidade: 'mensal'
    };
})

When('a api buscar as taxas cadastradas', async function () {
    resposta = await servico.buscaTodos();
});

When('a api buscar esta taxa', async function () {
    resposta = await servico.busca(id);
});

When('e solicitado incluir a taxa', async function () {
    try {
        resposta = await servico.inclui(doc);
    } catch (error: any) {
        resposta = error.message;
    }
});

When('e solicitado alterar a taxa', async function () {
    try {
        resposta = await servico.atualiza(id, doc);
    } catch (error: any) {
        resposta = error.message;
    }
});

Then('deveriam ser retornadas todas as taxas cadastradas', function () {
    assert.equal(resposta.docs.length, totalEsperado);
});

Then('deveria ser retornada a taxa solicitada', function () {
    //assert.equal(id, resposta.doc._id);
    assert.equal(resposta.sucesso, true);
});

Then('deveria ser informado que o tipo da taxa e obrigatorio', function () {
    //assert.equal(id, resposta.doc._id);
    assert.equal(resposta, 'O tipo é obrigatório.');
});

Then('deveria ser informado que o nome da taxa e obrigatorio', function () {
    //assert.equal(id, resposta.doc._id);
    assert.equal(resposta, 'O nome é obrigatório.');
});

Then('a taxa deveria ser incluida', function () {
    assert.equal(resposta.sucesso, true);
});

Then('a taxa deveria ser alterada', function () {
    assert.equal(resposta.sucesso, true);
});
