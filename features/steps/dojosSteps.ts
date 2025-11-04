import * as assert from 'assert';
import { AfterAll, BeforeAll, Given, Then, When } from "@cucumber/cucumber";
import { connectDB, disconnectDB } from "../../src/db";
import * as servico from '../../src/services/dojoService';

var resposta: any;
var totalEsperado = 0;
var id = '';
var doc: any = {};

BeforeAll(async function() {
    await connectDB();
})

AfterAll(async function() {
    await disconnectDB();
})

Given('que existem {int} dojos cadastrados', function (oTotal: number) {
    totalEsperado = oTotal;
});

Given('que existe o dojo cadastrado com o id {string}', function(oId: string) {
    id = oId;
})

Given('que existe(m) {int} dojo(s) inativo(s) cadastrado(s)', function (oTotal: number) {
    totalEsperado = oTotal;
});

Given('que existe(m) {int} dojo(s) ativo(s) cadastrado(s)', function (oTotal: number) {
    totalEsperado = oTotal;
});

Given('os dados do dojo', function() {
    doc = {
        nome: 'Nome: teste de integracao - inclusao',
        local: 'Local: teste de integracao - inclusao',
        endereco: 'Endereco: teste de integracao - inclusao',
        bairro: 'Bairro: teste de integracao - inclusao',
        cidade: 'Cidade: teste de integacao - inclusao',
        uf: 'UF: teste de integracao - inclusao',
        pais: 'Pais: teste de integracao - inclusao',
        url: 'URL: teste de integracao - inclusao',
        email: 'E-mail: teste de integracao - inclusao',
        id_professor: null,
        horarios: 'Horarios: teste de integracao - inclusao',
        is_ativo: true,
        } ;
});

Given('que o nome do dojo nao e informado', function() {
    doc.nome = null;
})

// *
// WHEN
// *

When('e solicitada a lista de todos os dojos cadastrados', async function () {
    resposta = await servico.buscaTodos();
});

When('e solicitada a lista de dojos ativos cadastrados', async function () {
    resposta = await servico.buscaAtivos();
});

When('e solicitada a lista de dojos inativos cadastrados', async function () {
    resposta = await servico.buscaInativos();
});

When('e solicitado os dados destes dojo', async function () {
    resposta = await servico.busca(id);
});

When('e solicitado incluir o dojo', async function() {
    try {
        resposta = await servico.inclui(doc);
    } catch (error) {
        resposta = error;
    }
});

When('e solicitado alterar o dojo', async function () {
    try {
        resposta = await servico.atualiza(id, doc);
    } catch (error) {
        resposta = error;
    }
});

//*
// THEN
// *

Then('deveriam ser listados todos os dojos cadastrados', function () {
    assert.equal(resposta.docs.length, totalEsperado);
});

Then('deveriam ser listados todos os dojos ativos cadastrados', function () {
    assert.equal(resposta.docs.length, totalEsperado);
});

Then('deveriam ser listados todos os dojos inativos cadastrados', function () {
    assert.equal(resposta.docs.length, totalEsperado);
});

Then('deveriam ser retornados os dados deste dojo', function () {
    //assert.equal(id, resposta.doc._id);
    assert.equal(resposta.sucesso, true);
});

Then('deveria ser informado que o nome do dojo e obrigatorio', function () {
    assert.equal(resposta.mensagem, 'O nome é obrigatório.');
});

