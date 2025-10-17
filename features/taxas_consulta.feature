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
Funcionalidade: Lista de taxas

    Cenario: Carrega todas as taxas cadastradas
        Dado que existem 11 taxas cadastradas
        Quando a api buscar as taxas cadastradas
        Entao deveriam ser retornadas todas as taxas cadastradas
    
    Cenario: Carrega uma taxa especifica cadastrada
        Dado que existe a taxa cadastrada com o id '68e7155095835e37916ded7d'
        Quando a api buscar esta taxa
        Entao deveria ser retornada a taxa solicitada