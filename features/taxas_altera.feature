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
Funcionalidade: Altera taxa

    @altera_01
    Cenario: O tipo nao e informado
        Dado que existe a taxa cadastrada com o id '68ed71ff4da1a6c12bc0c733'
        E que a taxa e informada sem o tipo
        Quando e solicitado alterar a taxa
        Entao deveria ser informado que o tipo da taxa e obrigatorio

    @altera_02
    Cenario: O nome nao e informado
        Dado que existe a taxa cadastrada com o id '68ed71ff4da1a6c12bc0c733'
        E que a taxa e informada sem o nome
        Quando e solicitado alterar a taxa
        Entao deveria ser informado que o nome da taxa e obrigatorio

    @altera_03
    Cenario: Altera com sucesso
        Dado que existe a taxa cadastrada com o id '68ed71ff4da1a6c12bc0c733'
        E que a taxa e alterada corretamente
        Quando e solicitado alterar a taxa
        Entao a taxa deveria ser alterada