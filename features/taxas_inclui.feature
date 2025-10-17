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
Funcionalidade: Inclui taxa

    @inclui_01
    Cenario: O tipo nao e informado
        Dado que a taxa e informada sem o tipo
        Quando e solicitado incluir a taxa
        Entao deveria ser informado que o tipo da taxa e obrigatorio

    @inclui_02
    Cenario: O nome nao e informado
        Dado que a taxa e informada sem o nome
        Quando e solicitado incluir a taxa
        Entao deveria ser informado que o nome da taxa e obrigatorio

    @inclui_03
    Cenario: Inclui com sucesso
        Dado que a taxa e informada corretamente
        Quando e solicitado incluir a taxa
        Entao a taxa deveria ser incluida