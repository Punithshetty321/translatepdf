import pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';

export const extractPages = async (pdfBuffer) => {
  console.log('Converting buffer to Uint8Array');
  const uint8Array = new Uint8Array(pdfBuffer.buffer, pdfBuffer.byteOffset, pdfBuffer.byteLength);

  const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
  const pdf = await loadingTask.promise;
  console.log(`PDF has ${pdf.numPages} pages`);

  const pages = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items.map(item => item.str).join(' ');
    console.log(`Extracted Page ${i}: ${text.slice(0, 100)}...`);
    pages.push({ page: i, text });
  }

  return pages;
};