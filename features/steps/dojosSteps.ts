import * as assert from 'assert';
import { AfterAll, BeforeAll, Given, Then, When } from "@cucumber/cucumber";
import { connectDB, disconnectDB } from "../../src/db";
import * as servico from '../../src/services/dojoService'

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

When('e solicitada a lista de todos os dojos cadastrados', async function () {
    resposta = await servico.buscaTodos();
});

When('e solicitada a lista de dojos ativos cadastrados', async function () {
    resposta = await servico.buscaAtivos();
});

When('e solicitado os dados destes dojo', async function (oId: string) {
    resposta = await servico.busca(oId);
});

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

