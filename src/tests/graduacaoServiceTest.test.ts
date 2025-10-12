import { db, close } from "../db";
import * as servico from "../servicos/graduacaoServico";


describe('Graduacoes service', () => {

  beforeAll(async () => {
    await db;
  });

  afterAll(async () => {
    close();
  })

  test('deveria retornar todas as graduacoes', async () => {
      try {
        const response: any = await servico.buscaTodos();
        expect(response.sucesso).toBe(true);
      } catch (err) {
        expect(err).toBeNull();
      }
  })

  test.only('deveria retornar a graduacao do id informado', async() => {
    try {
      const response: any = await servico.busca('687ebd93337f4a6e6cc653ea')
      expect(response.sucesso).toBe(true);
    } catch (err) {
      expect(err).toBeNull();
    }
  })

});