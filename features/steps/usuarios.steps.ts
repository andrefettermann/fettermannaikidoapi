import * as assert from 'assert';
import { AfterAll, BeforeAll, Given, Then, When } from "@cucumber/cucumber";
import { connectDB, disconnectDB } from "../../src/db";
import * as servico from '../../src/services/usuario.service';
import { IResultado } from '../../src/models/resultado';

interface IValueObject {
    email: string,
    senha: string,
    id_pessoa: string,
    perfil: string
}

var usuario: IValueObject = {
    email: 'teste@teste.com',
    senha: '123',
    id_pessoa: '',
    perfil: ''
};

var resposta: IResultado;

BeforeAll(async function() {
    await connectDB();
})

AfterAll(async function() {
    await disconnectDB();
})

Given('que o email do usuario nao e informado', function() {
    usuario.email = '';
})

Given('que o email do usuario informado esta cadastrado', function() {
    usuario.email = 'test@teste.com';
})

Given('que a senha do usuario nao e informada', function() {
    usuario.senha = '';
})

Given('que o perfil do usuario nao e informado', function() {
    usuario.perfil = '';
})

Given('que todos os dados do usuario sao informados', function() {
    usuario.email = 'admin@escoladeaikido.com';
    usuario.senha = 'iamtheadmin';
});

Given('que o email do usuario nao esta cadastrado', function() {
    usuario.email = 'xxxx@xxx.com'
});


// *
// WHEN
// *

When('e solicitado incluir os dados do usuario', async function () {
    resposta = await servico.inclui(usuario);
});

When('e solicitado buscar os dados do usuario', async function () {
    resposta = await servico.buscaEmail(usuario.email);
});

When('e solicitado fazer o login', async function() {
    resposta = await servico.login(usuario.email, usuario.senha);
});

//*
// THEN
// *

Then('deveria ser informado que o email do usuario e obrigatorio', function () {
    assert.equal(resposta.mensagem, 'O email é obrigatório.');
});

Then('deveria ser informado que a senha do usuario e obrigatoria', function () {
    assert.equal(resposta.mensagem, 'A senha é obrigatória.');
});

Then('deveria ser informado que o perfil do usuario e obrigatorio', function () {
    assert.equal(resposta.mensagem, 'O perfil é obrigatório.');
});

Then('deveria ser informado que o usuario nao foi encontrado', function () {
    assert.equal(resposta.mensagem, 'Email não encontrado.');
});

Then('deveria ser informado que o usuario ou a senha sao invalidos', function () {
    assert.equal(resposta.mensagem, 'Email e/ou senha inválido.');
});

Then('deveria ser informado que o email do usuario ja esta cadastrado', function () {
    assert.equal(resposta.mensagem, 'Email já cadastrado.');
});

Then('os dados do usuario nao deveriam ser gravados', function () {
    assert.equal(resposta.sucesso, false);
});

Then('os dados do usuario deveriam ser gravados', function () {
    assert.equal(resposta.sucesso, true);
});

Then('os dados do usuario deveriam ser encontrados', function () {
    assert.equal(resposta.sucesso, true);
});

Then('deveria se concedido acesso ao sistema', function () {
    assert.equal(resposta.sucesso, true);
});
