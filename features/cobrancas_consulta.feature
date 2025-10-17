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

#npx cucumber.js features/cobrancas_lista.feature --tags "@consulta_05" --format json:cuucmber-report.json

# language: pt
Funcionalidade: Lista de cobrancas

    @consulta_01
    Cenario: Nao existem cobrancas cadastradas
        Dado que nao existem cobrancas cadastradas
        Quando buscar as cobrancas cadastradas
        Entao nao deveriam ser retornadas cobrancas cadastradas
    
    Cenario: Existem cobrancas cadastradas
        Dado que existem 10 cobrancas cadastradas
        Quando buscar as cobrancas cadastradas
        Entao deveriam ser retornadas todas as cobrancas cadastradas

    Cenario: Carrega uma cobranca especifica cadastrada
        Dado que existe a cobranca cadastrada com o id '68e7155095835e37916ded7d'
        Quando e solicitado buscar esta cobranca
        Entao deveria ser retornada a cobranca solicitada

    @consulta_04
    Cenario: Carrega as cobrancas cadastradas para uma pessoa
        Dado que existem 4 cobrancas cadastradas para a pessoa com o id '6876d21a80066b9538e06444'
        Quando buscar as cobrancas cadastradas para a pessoa
        Entao deveriam ser retornadas todas as cobrancas cadastradas para a pessoa

    @consulta_05
    Cenario: Carrega as cobrancas cadastradas para uma taxa
        Dado que existem 3 cobrancas cadastradas para a taxa com o id '68e835da579cd77bc6206924'
        Quando buscar as cobrancas cadastradas para a taxa
        Entao deveriam ser retornadas todas as cobrancas cadastradas para a taxa

    Cenario: Carrega as cobrancas cadastradas para uma pessoa/taxa
        Dado que existem cobrancas cadastradas para a pessoa com o id ''
        E que existem cobrancas cadastradas para a taxa com o id '68e7155095835e37916ded7d'
        Quando e solicitado buscar as cobrancas cadastradas para esta pessoa e taxa
        Entao deveriam ser retornadas todas as cobrancas cadastradas para esta pessoa e taxa

    Cenario: Carrega as cobrancas vencidas
        Dado que existem cobrancas vencidas cadastradas
        Quando e solicitado buscar as cobrancas cadastradas vencidas
        Entao deveriam ser retornadas todas as cobrancas vencidas cadastradas

    Cenario: Carrega as cobrancas vencidas para uma pessoa
        Dado que existem cobrancas vencidas cadastradas para a pessoa com o id ''
        Quando e solicitado buscar as cobrancas cadastradas vencidas para esta pessoa
        Entao deveriam ser retornadas todas as cobrancas vencidas cadastradas para esta pessoa

    Cenario: Carrega as cobrancas para um periodo
        Dado que existem cobrancas para o periodo ''
        Quando e solicitado buscar as cobrancas cadastradas para este periodo
        Entao deveriam ser retornadas todas as cobrancas cadastradas para este periodo

    Cenario: Carrega as cobrancas para um periodo/taxa
        Dado que existem cobrancas para o periodo ''
        E que existe a taxa cadastrada para este periodo com o id ''
        Quando e solicitado buscar as cobrancas cadastradas para este periodo e taxa
        Entao deveriam ser retornadas todas as cobrancas cadastradas para este periodo e taxa
