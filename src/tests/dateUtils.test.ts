// src/utils/dateUtils.test.ts
import { convertDdMmYyyyToDate, formatDateDDMMAAAA } from "../utils/date";

describe('Utilitarios de data', () => {

  test('deveria converter para data', async () => {
    const dataConvertida = convertDdMmYyyyToDate('19/11/2022');
    console.log(dataConvertida)
    const data = new Date("2022-11-19");
    expect(dataConvertida).toBe(data);
  });

  test('deveria formatar a data', async () => {
    const date = new Date('2022-11-19T00:00:00.000Z');
    const dataFormatada = formatDateDDMMAAAA(date);
    expect(dataFormatada).toBe('19/11/2022');
  });
});
