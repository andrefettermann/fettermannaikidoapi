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
Funcionalidade: Exclui graduacao

    @exclui_01
    Cenario: A graduacao nao e informada
        Dado que a graduacao nao e informada
        Quando e solicitado excluir a graduacao
        Entao deveria ser informado que e necessario informar a graduacao

    @exclui_02
    Cenario: A graduacao tem pessoas associadas
        Dado que existe a graduacao cadastrada com o id '690a7856a7b191390b9f5309'
        E que esta graduacao tem pessoas associadas
        Quando e solicitado excluir a graduacao
        Entao deveria ser informado que graduacao com pessoas associadas nao pode ser excluida
