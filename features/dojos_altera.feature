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
Funcionalidade: Altera dojo

    Contexto: 
        Dado que existe o dojo cadastrado com o id "688bf0813442bec3d424acee"

    @altera_01
    Cenario: O nome nao e informado
        Dado que o nome do dojo nao e informado
        Quando e solicitado alterar o dojo
        Entao deveria ser informado que o nome do dojo e obrigatorio
