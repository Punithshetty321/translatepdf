import { parsePdfTable } from './services/pdfTableParser.js';
import { translateToEnglish } from './services/translate.js';

const run = async () => {
  try {
    const rows = await parsePdfTable('./uploads/test.pdf');

    console.log('\nRaw Table Output:\n');
    console.table(rows.slice(0, 100)); // preview first 100 rows

    // Optional: translate fields per row
    const translatedRows = await Promise.all(
      rows.map(async (row) =>
        Promise.all(row.map(async (cell) => {
          const t = await translateToEnglish(cell);
          return t;
        }))
      )
    );

    console.log('\nTranslated Rows:\n');
    console.table(translatedRows.slice(0, 100));
  } catch (err) {
    console.error('Error:', err.message);
  }
};

run();