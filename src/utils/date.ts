export function convertDdMmYyyyToDate(dateString: String) {
  // Split the string by '/' to get day, month, and year parts
  const parts = dateString.split('/');
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];

  // Reconstruct the string in YYYY-MM-DD format
  const isoFormattedString = `${year}-${month}-${day}`;

  // Create a new Date object from the ISO formatted string
  return new Date(isoFormattedString);
}

export function formatDateDDMMAAAA(date: Date): string {
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // meses vão de 0 a 11
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export function getCurrentMonth() {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return month;
}
