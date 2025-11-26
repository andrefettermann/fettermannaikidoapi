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
Funcionalidade: Consulta usuario

    @consulta_01
    Cenario: Nao existe um usuario cadastrado com o email informado
        Dado que o email do usuario nao esta cadastrado
        Quando e solicitado buscar os dados do usuario
        Entao deveria ser informado que o usuario nao foi encontrado

    @consulta_02
    Cenario: Existe um usuario cadastrado com o email informado
        Dado que o email do usuario esta cadastrado
        Quando e solicitado buscar os dados do usuario
        Entao os dados do usuario deveriam ser encontrados
