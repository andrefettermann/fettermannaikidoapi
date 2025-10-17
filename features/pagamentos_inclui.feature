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
Funcionalidade: Inclui pagamento

    @inclui_01
    Cenario: O valor pago nao e informado
        Dado um pagamento para uma cobranca cadastrada com o id '68ee5c9e82c741d425db9ee6' 
        E que este pagamento e informado sem o valor pago
        Quando incluir o pagamento
        Entao deveria ser informado que o valor do pagamento e obrigatorio

    @inclui_05
    Cenario: Inclui com sucesso
        Dado um pagamento para uma cobranca cadastrada com o id '68ee5c9e82c741d425db9ee6' 
        E que este pagamento e informado corretamente
        Quando incluir o pagamento
        Entao o pagamento deveria ser incluido