// src/tests/pessoaService.test.ts
// npm run test pessoaService
import { connectDB, disconnectDB } from "../db";
import * as servico from "../services/pessoaService";

describe('Testes unitarios do servico de pessoa', () => {

  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  })

  test('deveria retornar todas a pessoas cadastradas', async () => {
      try {
        const response: any = await servico.buscaTodos();
        expect(response.sucesso).toBe(true);
      } catch (err) {
        expect(err).toBeNull();
      }
  })

  test('deveria retornar a pessoa do id informado', async() => {
    try {
      const response: any = await servico.busca('6876d21a80066b9538e06444')
      expect(response.sucesso).toBe(true);
    } catch (err) {
      expect(err).toBeNull();
    }
  })

  test('deveria retornar os professores cadastrados', async () => {
      try {
        const response: any = await servico.buscaProfessores();
        expect(response.sucesso).toBe(true);
      } catch (err) {
        expect(err).toBeNull();
      }
  })

  test('deveria retornar as pessoas inativas', async () => {
      try {
        const response: any = await servico.buscaSituacao('Inativo');
        expect(response.sucesso).toBe(true);
      } catch (err) {
        expect(err).toBeNull();
      }
  })

  test('deveria retornar os aniversariantes do mes', async () => {
      try {
        const response: any = await servico.buscaAniversariantes('10');
        expect(response.sucesso).toBe(true);
      } catch (err) {
        expect(err).toBeNull();
      }
  })

  test('nao deveria incluir sem o nome', async() => {
    const doc = {
      aniversario: '01/01',
      matricula: '0000',
      nome: '',
      situacao: 'Ativo',
      cpf: '123.456.789-10',
      data_inicio_aikido: '01/01',
      data_matricula: '01/01',
      tipo: 'aluno',
      id_dojo: '688bf3b6670789903d6d15e4',
      id_graduacao: '687ec73055e3bc2dd43036f0',
      total_promocoes: 1,
      total_pagamentos: 1,
      data_pagamento_1: '01/01/2025',
      valor_pagamento_1: '10.1',
      descricao_pagamento_1: 'Teste',
      data_promocao_1: '01/01/2025',
      id_graduacao_promocao_1: '687ec73055e3bc2dd43036f0'
    };

    await expect(servico.inclui(doc)).rejects.toThrow('O nome é obrigatório.');
  })

  test('nao deveria incluir sem a situacao', async() => {
    const doc = {
      aniversario: '01/01',
      matricula: '0000',
      nome: 'Nome - Teste unitário de inclusao',
      situacao: '',
      cpf: '123.456.789-10',
      data_inicio_aikido: '01/01',
      data_matricula: '01/01',
      tipo: 'aluno',
      id_dojo: '688bf3b6670789903d6d15e4',
      id_graduacao: '687ec73055e3bc2dd43036f0',
      total_promocoes: 1,
      total_pagamentos: 1,
      data_pagamento_1: '01/01/2025',
      valor_pagamento_1: '10.1',
      descricao_pagamento_1: 'Teste',
      data_promocao_1: '01/01/2025',
      id_graduacao_promocao_1: '687ec73055e3bc2dd43036f0'
    };

    await expect(servico.inclui(doc)).rejects.toThrow('A situação é obrigatória.');
  })

  test.only('nao deveria incluir sem o tipo', async() => {
    const doc = {
      aniversario: '01/01',
      matricula: '0000',
      nome: 'Nome - Teste unitário de inclusao',
      situacao: 'Ativo',
      cpf: '123.456.789-10',
      data_inicio_aikido: '01/01',
      data_matricula: '01/01',
      tipo: '',
      id_dojo: '688bf3b6670789903d6d15e4',
      id_graduacao: '687ec73055e3bc2dd43036f0',
      total_promocoes: 1,
      total_pagamentos: 1,
      data_pagamento_1: '01/01/2025',
      valor_pagamento_1: '10.1',
      descricao_pagamento_1: 'Teste',
      data_promocao_1: '01/01/2025',
      id_graduacao_promocao_1: '687ec73055e3bc2dd43036f0'
    };

    await expect(servico.inclui(doc)).rejects.toThrow('O tipo é obrigatório.');
  })

  test('deveria incluir com sucesso', async() => {
    const doc = {
      aniversario: '01/01',
      matricula: '0000',
      nome: 'Nome - Teste unitário de inclusao',
      situacao: 'Ativo',
      cpf: '123.456.789-10',
      data_inicio_aikido: '01/01',
      data_matricula: '01/01',
      tipo: 'aluno',
      id_dojo: '688bf3b6670789903d6d15e4',
      id_graduacao: '687ec73055e3bc2dd43036f0',
      total_promocoes: 1,
      total_pagamentos: 1,
      data_pagamento_1: '01/01/2025',
      valor_pagamento_1: '10.1',
      descricao_pagamento_1: 'Teste',
      data_promocao_1: '01/01/2025',
      id_graduacao_promocao_1: '687ec73055e3bc2dd43036f0'
    };

    try {
      const response: any = await servico.inclui(doc);
      expect(response.sucesso).toBe(true);
    } catch (err) {
      expect(err).toBeNull();
    }

  })

  test('nao deveria alterar sem o nome', async() => {
    const id = '68e008ca2abd0edcc52945bf'
    const doc = {
      aniversario: '01/01',
      matricula: '0000',
      nome: '',
      situacao: 'Ativo',
      cpf: '123.456.789-10',
      data_inicio_aikido: '01/01',
      data_matricula: '01/01',
      tipo: 'aluno',
      id_dojo: '688bf3b6670789903d6d15e4',
      id_graduacao: '687ec73055e3bc2dd43036f0',
      total_promocoes: 1,
      total_pagamentos: 1,
      data_pagamento_1: '01/01/2025',
      valor_pagamento_1: '10.1',
      descricao_pagamento_1: 'Teste',
      data_promocao_1: '01/01/2025',
      id_graduacao_promocao_1: '687ec73055e3bc2dd43036f0'
    };

    await expect(servico.atualiza(id, doc)).rejects.toThrow('O nome é obrigatório.');
  })

  test('nao deveria alterar sem a situacao', async() => {
    const id = '68e008ca2abd0edcc52945bf'
    const doc = {
      aniversario: '01/01',
      matricula: '0000',
      nome: 'Teste unitario de alteracao',
      situacao: '',
      cpf: '123.456.789-10',
      data_inicio_aikido: '01/01',
      data_matricula: '01/01',
      tipo: 'aluno',
      id_dojo: '688bf3b6670789903d6d15e4',
      id_graduacao: '687ec73055e3bc2dd43036f0',
      total_promocoes: 1,
      total_pagamentos: 1,
      data_pagamento_1: '01/01/2025',
      valor_pagamento_1: '10.1',
      descricao_pagamento_1: 'Teste',
      data_promocao_1: '01/01/2025',
      id_graduacao_promocao_1: '687ec73055e3bc2dd43036f0'
    };

    await expect(servico.atualiza(id, doc)).rejects.toThrow('A situação é obrigatória.');
  })

  test('nao deveria alterar sem o tipo', async() => {
    const id = '68e008ca2abd0edcc52945bf'
    const doc = {
      aniversario: '01/01',
      matricula: '0000',
      nome: 'Teste unitario de alteracao',
      situacao: 'Ativo',
      cpf: '123.456.789-10',
      data_inicio_aikido: '01/01',
      data_matricula: '01/01',
      tipo: '',
      id_dojo: '688bf3b6670789903d6d15e4',
      id_graduacao: '687ec73055e3bc2dd43036f0',
      total_promocoes: 1,
      total_pagamentos: 1,
      data_pagamento_1: '01/01/2025',
      valor_pagamento_1: '10.1',
      descricao_pagamento_1: 'Teste',
      data_promocao_1: '01/01/2025',
      id_graduacao_promocao_1: '687ec73055e3bc2dd43036f0'
    };

    await expect(servico.atualiza(id, doc)).rejects.toThrow('O tipo é obrigatório.');
  })

  test('deveria alterar com sucesso', async() => {
    const id = ''
    const doc = {
      aniversario: '01/01',
      matricula: '0000',
      nome: '',
      situacao: 'Ativo',
      cpf: '123.456.789-10',
      data_inicio_aikido: '01/01',
      data_matricula: '01/01',
      tipo: 'professor',
      id_dojo: '688bf3b6670789903d6d15e4',
      id_graduacao: '687ec73055e3bc2dd43036f0',
      total_promocoes: 1,
      total_pagamentos: 1,
      data_pagamento_1: '01/01/2025',
      valor_pagamento_1: '10.1',
      descricao_pagamento_1: 'Teste',
      data_promocao_1: '01/01/2025',
      id_graduacao_promocao_1: '687ec73055e3bc2dd43036f0'
    };

    try {
      const response: any = await servico.atualiza(id, doc);
      expect(response.sucesso).toBe(true);
    } catch (err) {
      expect(err).toBeNull();
    }

  })
});