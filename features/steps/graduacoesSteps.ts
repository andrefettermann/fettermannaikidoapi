import * as assert from 'assert';
import { AfterAll, BeforeAll, Given, Then, When } from "@cucumber/cucumber";
import { connectDB, disconnectDB } from "../../src/db";
import * as servico from '../../src/services/graduacaoService';

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

Given('que a graduacao nao e informada', function () {
    id = '';
});

Given('que existe a graduacao cadastrada com o id {string}', function(oId: string) {
    id = oId;
});

Given('que esta graduacao tem pessoas associadas', function() {
});

// *
// WHEN
// *

When('e solicitado excluir a graduacao', async function () {
    resposta = await servico.exclui(id);
});


//*
// THEN
// *

Then('deveria ser informado que e necessario informar a graduacao', function () {
    assert.equal(resposta.mensagem, 'Informe a graduação a ser excluída.');
});

Then('deveria ser informado que graduacao com pessoas associadas nao pode ser excluida', function () {
    assert.equal(resposta.mensagem, 'Não é possível excluir graduação com pessoas associadas.');
});
