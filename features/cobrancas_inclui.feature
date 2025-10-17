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
Funcionalidade: Inclui cobranca

    @inclui_01
    Cenario: A pessoa nao e informada
        Dado que a cobranca e informada sem a pessoa
        Quando incluir a cobranca
        Entao deveria ser informado que a pessoa da cobranca e obrigatoria

    @inclui_02
    Cenario: A taxa nao e informada
        Dado que a cobranca e informada sem a taxa
        Quando incluir a cobranca
        Entao deveria ser informado que a taxa da cobranca e obrigatoria

    @inclui_03
    Cenario: A data de vencimento nao e informada
        Dado que a cobranca e informada sem a data de vencimento
        Quando incluir a cobranca
        Entao deveria ser informado que a data de vencimento da cobranca e obrigatoria

    @inclui_04
    Cenario: A data de emissao nao e informada
        Dado que a cobranca e informada sem a data de emissao
        Quando incluir a cobranca
        Entao deveria ser informado que a data de emissao da cobranca e obrigatoria

    @inclui_05
    Cenario: Inclui com sucesso
        Dado que a cobranca e informada corretamente
        Quando incluir a cobranca
        Entao a cobranca deveria ser incluida