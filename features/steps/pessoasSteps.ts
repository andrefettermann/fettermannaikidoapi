import * as assert from 'assert';
import { AfterAll, BeforeAll, Given, Then, When } from "@cucumber/cucumber";
import { connectDB, disconnectDB } from "../../src/db";
import * as servico from '../../src/services/pessoa.service';

var resposta: any;
var totalEsperado = 0;
var id = '';
var doc: any = {};
var mes = '';

BeforeAll(async function() {
    await connectDB();
})

AfterAll(async function() {
    await disconnectDB();
})

Given('que existem {int} pessoas cadastradas', function (oTotal: number) {
    totalEsperado = oTotal;
});

Given('que existe a pessoa cadastrada com o id {string}', function(oId: string) {
    id = oId;
})

Given('que existe(m) {int} pessoa(s) inativa(s)/ativa(s) cadastrada(s)', function (oTotal: number) {
    totalEsperado = oTotal;
});

Given('que existe(m) {int} aniversariante(s) do mes {string} cadastrada(s)', function (oTotal: number, oMes: string) {
    totalEsperado = oTotal;
    mes = oMes;
});


Given('que existe(m) {int} professor(es) cadastrado(s)', function (oTotal: number) {
    totalEsperado = oTotal;
});

Given('os dados da pessoa', function() {
    doc = {
        } ;
});

Given('que o nome da pessoa nao e informado', function() {
    doc.nome = null;
})

// *
// WHEN
// *

When('e solicitada a lista de todas as pessoas cadastradas', async function () {
    resposta = await servico.buscaTodos();
});

When('e solicitada a lista de pessoas inativas cadastradas', async function () {
    resposta = await servico.buscaSituacao('Inativo');
});

When('e solicitada a lista de pessoas ativas cadastradas', async function () {
    resposta = await servico.buscaSituacao('Ativo');
});

When('e solicitada a lista de aniversariantes deste mes cadastradas', async function () {
    resposta = await servico.buscaAniversariantes(mes);
});

When('e solicitada a lista de professores cadastrados', async function () {
    resposta = await servico.buscaProfessores();
});

When('e solicitado os dados desta pessoa', async function () {
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

Then('deveriam ser retornadas todas as pessoas cadastradas', function () {
    assert.equal(resposta.docs.length, totalEsperado);
});

Then('deveriam ser retornadas todas as pessoas inativas/ativas cadastradas', function () {
    assert.equal(resposta.docs.length, totalEsperado);
});

Then('deveriam ser retornados todos os aniversariantes deste mes cadastrados', function () {
    assert.equal(resposta.docs.length, totalEsperado);
});

Then('deveriam ser retornados todos os professores cadastrados', function () {
    assert.equal(resposta.docs.length, totalEsperado);
});

Then('deveriam ser retornados os dados desta pessoa', function () {
    //assert.equal(id, resposta.doc._id);
    assert.equal(resposta.sucesso, true);
});

Then('nao deveriam ser retornados os dados desta pessoa', function () {
    //assert.equal(id, resposta.doc._id);
    assert.equal(resposta.mensagem, 'Pessoa não encontrada.');
});

Then('deveria ser informado que o nome do dojo e obrigatorio', function () {
    assert.equal(resposta.mensagem, 'O nome é obrigatório.');
});

