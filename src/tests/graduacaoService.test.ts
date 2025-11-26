// src/tests/graduacaoService.test.ts
// npm run test gredaucaoService
import { connectDB, disconnectDB } from "../db";
import * as servico from "../services/graduacao.service";

describe('Testes unitarios do servico de graduacoes', () => {

  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  })

  test('deveria retornar todas as graduacoes cadastradas', async () => {
    try {
      const response: any = await servico.buscaTodos();
      expect(response.sucesso).toBe(true);
    } catch (err) {
      expect(err).toBeNull();
    }
  })

  test('deveria retornar a graduacao do id informado', async() => {
    try {
      const response: any = await servico.busca('687ebd93337f4a6e6cc653ea')
      expect(response.sucesso).toBe(true);
    } catch (err) {
      expect(err).toBeNull();
    }
  })

  test('nao deveria incluir sem a sequencia', async() => {
    const doc = {
      sequencia: null,
      nome: 'Teste unitario de inclusao',
      faixa: 'Teste unitario de inclusao',
      horas_exame: '0',
      meses_exame: '0',
      categoria: 'Infantil',
      observacoes: 'Teste unitario de inclusao',
      total_tecnica: 1,
      nome_1: 'Teste unitario de inclusao',
    };

    await expect(servico.inclui(doc)).rejects
                .toThrow('A sequência é obrigatória.');
  })
  
  test('nao deveria incluir sem o nome', async() => {
    const doc = {
      sequencia: '100',
      nome: '',
      faixa: 'Teste unitario de inclusao',
      horas_exame: '0',
      meses_exame: '0',
      categoria: 'Infantil',
      observacoes: 'Teste unitario de inclusao',
      total_tecnica: 1,
      nome_1: 'Teste unitario de inclusao',
    };

    await expect(servico.inclui(doc)).rejects
                .toThrow('O nome é obrigatório.');
  })

  test('nao deveria incluir sem a categoria', async() => {
    const doc = {
      sequencia: '100',
      nome: 'Teste',
      faixa: 'Teste unitario de inclusao',
      horas_exame: '0',
      meses_exame: '0',
      categoria: '',
      observacoes: 'Teste unitario de inclusao',
      total_tecnica: 1,
      nome_1: 'Teste unitario de inclusao',
    };

    await expect(servico.inclui(doc)).rejects
                .toThrow('A categoria é obrigatória.');
  })

  test('deveria incluir com sucesso', async() => {
    const doc = {
      sequencia: '1000',
      nome: 'Teste unitario de inclusao',
      faixa: 'Teste unitario de inclusao',
      horas_exame: '0',
      meses_exame: '0',
      categoria: 'Infantil',
      observacoes: 'Teste unitario de inclusao',
      total_tecnicas: 1,
      nome_1: 'Teste unitario de inclusao',
    };

    try {
      const response: any = await servico.inclui(doc)
      expect(response.sucesso).toBe(true);
    } catch (err) {
      expect(err).toBeNull();
    }
  })

  test('nao deveria alterar sem a sequencia', async() => {
    const id = '68ecf5d2f51c99f54e3d0517';
    const doc = {
      sequencia: null,
      nome: 'Teste unitario de alteracao',
      faixa: 'Teste unitario de alteracao',
      horas_exame: '0',
      meses_exame: '0',
      categoria: 'Infantil',
      observacoes: 'Teste unitario de alteracao',
      total_tecnica: 1,
      nome_1: 'Teste unitario de alteracao',
    };

    await expect(servico.atualiza(id, doc)).rejects
                  .toThrow('A sequência é obrigatória.');
  })

  test('nao deveria alterar sem o nome', async() => {
    const id = '68ecf5d2f51c99f54e3d0517';
    const doc = {
      sequencia: '1000',
      nome: '',
      faixa: 'Teste unitario de alteracao',
      horas_exame: '0',
      meses_exame: '0',
      categoria: 'Infantil',
      observacoes: 'Teste unitario de alteracao',
      total_tecnica: 1,
      nome_1: 'Teste unitario de alteracao',
    };

    await expect(servico.atualiza(id, doc)).rejects
                .toThrow('O nome é obrigatório.');
  })

  test('nao deveria alterar sem a categoria', async() => {
    const id = '68ecf5d2f51c99f54e3d0517';
    const doc = {
      sequencia: '100',
      nome: 'Teste',
      faixa: 'Teste unitario de inclusao',
      horas_exame: '0',
      meses_exame: '0',
      categoria: '',
      observacoes: 'Teste unitario de inclusao',
      total_tecnica: 1,
      nome_1: 'Teste unitario de inclusao',
    };

    await expect(servico.atualiza(id, doc)).rejects
                .toThrow('A categoria é obrigatória.');
  })

  test('deveria alterar com sucesso', async() => {
    const id = '68ecf5d2f51c99f54e3d0517';
    const doc = {
      sequencia: '9999',
      nome: 'Teste unitario de alteracao',
      faixa: 'Teste unitario de alteracao',
      horas_exame: '0',
      meses_exame: '0',
      categoria: 'Adulto',
      observacoes: 'Teste unitario de alteracao',
      total_tecnicas: 1,
      nome_1: 'Teste unitario de alteracao',
    };

    try {
      const response: any = await servico.atualiza(id, doc)
      expect(response.sucesso).toBe(true);
    } catch (err) {
      expect(err).toBeNull();
    }
  })

});