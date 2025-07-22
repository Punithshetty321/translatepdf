export const parseTransactions = (text) => {
  const blocks = text.split(/(?:Sr\. No\.|Serial No\.|Doc No\.|S\.No\.)/i);
  const transactions = [];

  for (const block of blocks) {
    const transaction = {
      serialNumber: match(/(?:Serial No\.|Sr\. No\.)\s*(\d+)/, block),
      documentNumber: match(/Document Number[:\s]*([\w\/]+)/, block),
      executionDate: match(/Date of Execution[:\s]*([\d\-A-Za-z]+)/, block),
      registrationDate: match(/Date of Registration[:\s]*([\d\-A-Za-z]+)/, block),
      seller: match(/Name of Executant(?:s)?[:\s]*([^\n]+)/, block),
      buyer: match(/Name of Claimant(?:s)?[:\s]*([^\n]+)/, block),
      surveyNumber: match(/Survey Number[:\s]*([\w, \-]+)/, block),
      houseNumber: match(/House Number[:\s]*([\w\-]+)/, block),
      value: match(/Value[:\s]*Rs\.?[\s]?([\d,]+)/, block),
    };

    if (Object.values(transaction).some(v => v)) {
      transactions.push(transaction);
    }
  }

  return transactions;
};

function match(regex, text) {
  const result = text.match(new RegExp(regex, 'i'));
  return result?.[1]?.trim() || null;
}