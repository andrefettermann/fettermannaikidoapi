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
Funcionalidade: Consulta pessoas cadastradas

    @consulta_01
    Cenario: Solicita a lista de todas as pessoas cadastradas
        Dado que existem 28 pessoas cadastradas
        Quando e solicitada a lista de todas as pessoas cadastradas
        Entao deveriam ser retornadas todas as pessoas cadastradas
    
    @consulta_02
    Cenario: Solicita os dados de uma pessoa cadastrada
        Dado que existe a pessoa cadastrada com o id "6876d21a80066b9538e06444"
        Quando e solicitado os dados desta pessoa
        Entao deveriam ser retornados os dados desta pessoa

    @consulta_02
    Cenario: Solicita os dados de uma pessoa nao cadastrada
        Dado que existe a pessoa cadastrada com o id "7876d21a80066b9538e06444"
        Quando e solicitado os dados desta pessoa
        Entao nao deveriam ser retornados os dados desta pessoa

    @consulta_03
    Cenario: Solicita a lista de pessoas inativas cadastradas
        Dado que existem 17 pessoas inativas cadastradas
        Quando e solicitada a lista de pessoas inativas cadastradas
        Entao deveriam ser retornadas todas as pessoas inativas cadastradas

    @consulta_04
    Cenario: Solicita a lista de pessoas ativas cadastradas
        Dado que existem 11 pessoas ativas cadastradas
        Quando e solicitada a lista de pessoas ativas cadastradas
        Entao deveriam ser retornadas todas as pessoas ativas cadastradas

    @consulta_05
    Cenario: Solicita a lista de aniversariantes do mes cadastradas
        Dado que existem 2 aniversariantes do mes '08' cadastradas
        Quando e solicitada a lista de aniversariantes deste mes cadastradas
        Entao deveriam ser retornados todos os aniversariantes deste mes cadastrados

    @consulta_06
    Cenario: Solicita a lista de professores cadastrados
        Dado que existem 5 professores cadastrados
        Quando e solicitada a lista de professores cadastrados
        Entao deveriam ser retornados todos os professores cadastrados

