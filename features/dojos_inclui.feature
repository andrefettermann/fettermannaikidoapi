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
Funcionalidade: Inclui dojo

    @inclui_01
    Cenario: O nome nao e informado
        Dado que o nome do dojo nao e informado
        Quando e solicitado incluir o dojo
        Entao deveria ser informado que o nome do dojo e obrigatorio
