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

#npx cucumber.js features/dojos_consulta.feature --tags "@consulta_05" --format json:cucumber-report.json

# language: pt
Funcionalidade: Lista de dojos

    @consulta_01
    Cenario: Solicita a lista de todos os dojos cadastrados
        Dado que existem 6 dojos cadastrados
        Quando e solicitada a lista de todos os dojos cadastrados
        Entao deveriam ser listados todos os dojos cadastrados
    
    @consulta_02
    Cenario: Solicita os dados de um dojo cadastrado específico
        Dado que existe o dojo cadastrado com o id '688bf0813442bec3d424acee'
        Quando e solicitado os dados destes dojo
        Entao deveriam ser retornados os dados deste dojo

    Cenario: Solicita a lista de dojos inativos cadastrados
        Dado que existem 10 dojos inativos cadastrados
        Quando e solicitada a lista de dojos inativos cadastrados
        Entao deveriam ser listados todos os dojos inativos cadastrados

    @consulta_04
    Cenario: Solicita a lista de dojos ativos cadastrados
        Dado que existem 4 dojos ativos cadastrados
        Quando e solicitada a lista de dojos ativos cadastrados
        Entao deveriam ser listados todos os dojos ativos cadastrados