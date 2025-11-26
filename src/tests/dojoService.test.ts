// src/tests/dojoService.test.ts
import { connectDB, disconnectDB } from "../db";
import * as servico from "../services/dojo.service";

describe('Testes unitarios do servico de dojo', () => {

  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  })

  test('deveria retornar todos os dojos', async () => {
      try {
        const response: any = await servico.buscaTodos();
        expect(response.sucesso).toBe(true);
      } catch (err) {
        expect(err).toBeNull();
      }
  })

  test('deveria retornar o dojo do id informado', async() => {
    try {
      const response: any = await servico.busca('688bf0813442bec3d424acee')
      expect(response.sucesso).toBe(true);
    } catch (err) {
      expect(err).toBeNull();
    }
  })

  test('nao deveria incluir sem o nome', async() => {
    const doc = {
      nome: '',
      local: 'Local - Teste unitario de inclusao',
      bairro: 'Bairro - Teste unitario de inclusao',
      cidade: 'Cidade - Teste unitario de inclusao',
      uf: 'UF - Teste unitario de inclusao',
      pais: 'País - Teste unitario de inclusao',
      endereco: 'Endereco - Teste unitario de inclusao',
      id_professor: '6876d21a80066b9538e06444',
      url: 'URL - Teste unitario de inclusao',
      email: 'E-mail - Teste unitario de inclusao',
      horarios: 'Horarios - Teste unitario de inclusao'
    };

    await expect(servico.inclui(doc)).rejects.toThrow('O nome é obrigatório.');
  })


  test('deveria incluir com sucesso', async() => {
    const doc = {
      nome: 'Nome - Teste unitário de inclusao',
      local: 'Local - Teste unitario de inclusao',
      bairro: 'Bairro - Teste unitario de inclusao',
      cidade: 'Cidade - Teste unitario de inclusao',
      uf: 'UF - Teste unitario de inclusao',
      pais: 'País - Teste unitario de inclusao',
      endereco: 'Endereco - Teste unitario de inclusao',
      id_professor: '6876d21a80066b9538e06444',
      url: 'URL - Teste unitario de inclusao',
      email: 'E-mail - Teste unitario de inclusao',
      horarios: 'Horarios - Teste unitario de inclusao'
    };

    try {
      const response: any = await servico.inclui(doc);
      expect(response.sucesso).toBe(true);
    } catch (err) {
      expect(err).toBeNull();
    }

  })

  test('nao deveria alterar sem o nome', async() => {
    const id = '68ebce8261b7577bf5c16db2'
    const doc = {
      nome: '',
      local: 'Local - Teste unitario de inclusao',
      bairro: 'Bairro - Teste unitario de inclusao',
      cidade: 'Cidade - Teste unitario de inclusao',
      uf: 'UF - Teste unitario de inclusao',
      pais: 'País - Teste unitario de inclusao',
      endereco: 'Endereco - Teste unitario de inclusao',
      id_professor: '6876d21a80066b9538e06444',
      url: 'URL - Teste unitario de inclusao',
      email: 'E-mail - Teste unitario de inclusao',
      horarios: 'Horarios - Teste unitario de inclusao'
    };

    await expect(servico.atualiza(id, doc)).rejects.toThrow('O nome é obrigatório.');
  })

  test.only('deveria alterar com sucesso', async() => {
    const id = '68ebce8261b7577bf5c16db2'
    const doc = {
      nome: 'Nome - Teste unitário de alteracao',
      local: 'Local - Teste unitario de alteracao',
      bairro: 'Bairro - Teste unitario de alteracao',
      cidade: 'Cidade - Teste unitario de alteracao',
      uf: 'UF - Teste unitario de alteracao',
      pais: 'País - Teste unitario de alteracao',
      endereco: 'Endereco - Teste unitario de alteracao',
      id_professor: '6876d21a80066b9538e06444',
      url: 'URL - Teste unitario de alteracao',
      email: 'E-mail - Teste unitario de alteracao',
      horarios: 'Horarios - Teste unitario de alteracao'
    };

    try {
      const response: any = await servico.atualiza(id, doc);
      expect(response.sucesso).toBe(true);
    } catch (err) {
      expect(err).toBeNull();
    }

  })
});