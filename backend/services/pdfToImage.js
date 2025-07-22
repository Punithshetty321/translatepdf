import { PdfConverter } from 'pdf-poppler';
import path from 'path';
import fs from 'fs/promises';

export const convertPdfToImages = async (pdfPath, outputDir = './temp') => {
  await fs.mkdir(outputDir, { recursive: true });

  const options = {
    format: 'jpeg',
    out_dir: outputDir,
    out_prefix: path.basename(pdfPath, path.extname(pdfPath)),
    page: null // convert all pages
  };

  const converter = new PdfConverter(pdfPath);
  await converter.convert(options);

  const files = await fs.readdir(outputDir);
  return files
    .filter(f => f.endsWith('.jpg'))
    .map(f => path.join(outputDir, f));
};