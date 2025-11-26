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
Funcionalidade: Inclui usuario

    @inclui_01
    Cenario: O email e obrigatorio
        Dado que o email do usuario nao e informado
        Quando e solicitado incluir os dados do usuario
        Entao deveria ser informado que o email do usuario e obrigatorio
        E os dados do usuario nao deveriam ser gravados

    @inclui_02
    Cenario: Nao e permitida duplicidade de email
        Dado que o email do usuario informado esta cadastrado
        Quando e solicitado incluir os dados do usuario
        Entao deveria ser informado que o email do usuario ja esta cadastrado
        E os dados do usuario nao deveriam ser gravados

    @inclui_03
    Cenario: A senha e obrigatoria
        Dado que a senha do usuario nao e informada
        Quando e solicitado incluir os dados do usuario
        Entao deveria ser informado que a senha do usuario e obrigatoria
        E os dados do usuario nao deveriam ser gravados

    @inclui_04
    Cenario: O perfil e obrigatorio
        Dado que o perfil do usuario nao e informado
        Quando e solicitado incluir os dados do usuario
        Entao deveria ser informado que o perfil do usuario e obrigatorio
        E os dados do usuario nao deveriam ser gravados

    @inclui_05
    Cenario: Inclui com sucesso
        Dado que todos os dados do usuario sao informados
        Quando e solicitado incluir os dados do usuario
        Entao os dados do usuario deveriam ser gravados

