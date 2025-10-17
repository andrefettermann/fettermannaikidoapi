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
Funcionalidade: Altera cobranca

    @altera_01
    Cenario: A pessoa nao e informada
        Dado que existe a cobranca cadastrada com o id '68ee5c9e82c741d425db9ee6'
        E que a cobranca e informada sem a pessoa
        Quando gravar a alteracao da cobranca
        Entao deveria ser informado que a pessoa da cobranca e obrigatoria

    @altera_02
    Cenario: A taxa nao e informada
        Dado que existe a cobranca cadastrada com o id '68ee5c9e82c741d425db9ee6'
        E que a cobranca e informada sem a taxa
        Quando gravar a alteracao da cobranca
        Entao deveria ser informado que a taxa da cobranca e obrigatoria

    @altera_03
    Cenario: A data de vencimento nao e informada
        Dado que existe a cobranca cadastrada com o id '68ee5c9e82c741d425db9ee6'
        E que a cobranca e informada sem a data de vencimento
        Quando gravar a alteracao da cobranca
        Entao deveria ser informado que a data de vencimento da cobranca e obrigatoria

    @altera_04
    Cenario: A data de emissao nao e informada
        Dado que existe a cobranca cadastrada com o id '68ee5c9e82c741d425db9ee6'
        E que a cobranca e informada sem a data de emissao
        Quando gravar a alteracao da cobranca
        Entao deveria ser informado que a data de emissao da cobranca e obrigatoria

    @altera_05
    Cenario: Altera com sucesso
        Dado que existe a cobranca cadastrada com o id '68ee5c9e82c741d425db9ee6'
        Dado que a cobranca e alterada corretamente
        Quando gravar a alteracao da cobranca
        Entao a cobranca deveria ser alterada