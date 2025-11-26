// src/tests/taxaService.test.ts
// npm run test taxaService
import { connectDB, disconnectDB } from "../db";
import * as servico from "../services/taxa.service";

describe('Testes unitarios do servico de taxa', () => {

  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  })

  test('deveria retornar todas as taxas cadastradas', async () => {
      try {
        const response: any = await servico.buscaTodos();
        expect(response.sucesso).toBe(true);
      } catch (err) {
        expect(err).toBeNull();
      }
  })

  test('deveria retornar a taxa do id informado', async() => {
    try {
      const response: any = await servico.busca('68e7155095835e37916ded7d')
      expect(response.sucesso).toBe(true);
    } catch (err) {
      expect(err).toBeNull();
    }
  })

  test('nao deveria incluir sem o tipo', async() => {
    const doc = {
      tipo: '',
      nome: 'Teste de inclusao unitario',
      descricao: 'Teste de inclusao unitario',
      valor_padrao: '0',
      is_recorrente: 'true',
      is_ativa: 'true',
      periodicidade: 'anual'
    };

    await expect(servico.inclui(doc)).rejects.toThrow('O tipo é obrigatório.');
  })

  test.only('nao deveria incluir sem o nome', async() => {
    const doc = {
      tipo: 'Anuidade',
      nome: '',
      descricao: 'Teste de inclusao unitario',
      valor_padrao: '0',
      is_recorrente: 'true',
      is_ativa: 'true',
      periodicidade: 'anual'
    };

    await expect(servico.inclui(doc)).rejects.toThrow('O nome é obrigatório.');
  })

  test('deveria incluir com sucesso', async() => {
    const doc = {
      tipo: 'Anuidade',
      nome: 'Teste de inclusao unitario',
      descricao: 'Teste de inclusao unitario',
      valor_padrao: '0',
      is_recorrente: 'true',
      is_ativa: 'true',
      periodicidade: 'anual'
    };

    try {
      const response: any = await servico.inclui(doc);
      expect(response.sucesso).toBe(true);
    } catch (err) {
      expect(err).toBeNull();
    }

  })

  test('nao deveria alterar sem o tipo', async() => {
    const id = '68ed71ff4da1a6c12bc0c733';
    const doc = {
      tipo: '',
      nome: 'Teste de inclusao unitario',
      descricao: 'Teste de inclusao unitario',
      valor_padrao: '0',
      is_recorrente: 'true',
      is_ativa: 'true',
      periodicidade: 'anual'
    };

    await expect(servico.atualiza(id, doc)).rejects.toThrow('O tipo é obrigatório.');
  })

  test('nao deveria alterar sem o nome', async() => {
    const id = '68ed71ff4da1a6c12bc0c733';
    const doc = {
      tipo: 'anual',
      nome: '',
      descricao: 'Teste de inclusao unitario',
      valor_padrao: '0',
      is_recorrente: 'true',
      is_ativa: 'true',
      periodicidade: 'anual'
    };

    await expect(servico.atualiza(id, doc)).rejects.toThrow('O nome é obrigatório.');
  })

  test.only('deveria alterar com sucesso', async() => {
    const id = '68ed71ff4da1a6c12bc0c733';
    const doc = {
      tipo: 'Anuidade',
      nome: 'Teste de alteracao unitario',
      descricao: 'Teste de alteracao unitario',
      valor_padrao: '0',
      is_recorrente: 'true',
      is_ativa: 'true',
      periodicidade: 'anual'
    };

    try {
      const response: any = await servico.atualiza(id, doc);
      expect(response.sucesso).toBe(true);
    } catch (err) {
      expect(err).toBeNull();
    }

  })
});