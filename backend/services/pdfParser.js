import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pdfjsLib from 'pdfjs-dist/legacy/build/pdf.js';

const { getDocument, GlobalWorkerOptions } = pdfjsLib;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Set the correct path to the worker file
GlobalWorkerOptions.workerSrc = path.join(
  __dirname,
  '../node_modules/pdfjs-dist/legacy/build/pdf.worker.js'
);

/**
 * Extracts Tamil/Unicode text from a text-based PDF
 */
export const parsePdf = async (filePath) => {
  const data = new Uint8Array(fs.readFileSync(filePath));
  const loadingTask = getDocument({ data });

  const doc = await loadingTask.promise;
  const totalPages = doc.numPages;

  let fullText = '';

  for (let i = 1; i <= totalPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(' ');
    fullText += pageText + '\n';
  }

  return fullText;
};