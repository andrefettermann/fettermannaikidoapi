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
Funcionalidade: Exclui pagamento

    @exclui_01
    Cenario: Exclui o pagamento com sucesso
        Dado que existe a cobranca cadastrada com o id '68f03e53d521706035674fbc' 
        E que existe um pagamento desta cobranca cadastrado com o id ''
        Quando e solicitado excluir o pagamento
        Entao o pagamento everia ser excluido com sucesso

    @exclui_02
    Cenario: O pagamento nao foi informado
        Dado que existe a cobranca cadastrada com o id '68f03e53d521706035674fbc' 
        E que o pagamento nao e informado
        Quando e solicitado excluir o pagamento
        Entao deveria ser informado que o pagamento e obrigatorio

    @exclui_03
    Cenario: O pagamento  informado nao existe
        Dado que existe a cobranca cadastrada com o id '68f03e53d521706035674fbc' 
        E que e informado um pagamento nao cadastrado
        Quando e solicitado excluir o pagamento
        Entao deveria ser informado que o pagamento nao esta cadastrado
