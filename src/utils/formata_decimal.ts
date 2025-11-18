export function formataValorComDecimais(num: number): string {
  return num.toLocaleString('pt', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formataMoeda(
  value: number,
  locale: string = 'pt-BR',
  currencyCode: string = 'BRL',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'narrowSymbol'
  }).format(value);
}
