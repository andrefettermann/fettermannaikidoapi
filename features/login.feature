# Executa todas as features
# npm test

# Diretamente
# npx cucumber-js

# Feature específica
# npx cucumber-js features/exemplo.feature

# Com tags
# npx cucumber-js --tags "@smoke"

# Com formato específico
# npx cucumber-js --format json:cucumber-report.json

# language: pt
Funcionalidade: Login

    @login_01
    Cenario: Usuario nao cadastrado
        Dado que o email do usuario nao esta cadastrado
        Quando e solicitado fazer o login
        Entao deveria ser informado que o usuario ou a senha sao invalidos

    @login_03
    Cenario: Usuario cadastrado
        Dado que todos os dados do usuario sao informados
        Quando e solicitado fazer o login
        Entao deveria se concedido acesso ao sistema
