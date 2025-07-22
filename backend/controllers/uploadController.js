import { parsePdf } from "../services/ocrParser.js";
import { translateTamilToEnglish } from "../services/translate.js";
import { parseTransactionsFromText } from "../services/transactionParser.js";

export const handlePdfUpload = async (req, res) => {
  try {
    const filePath = req.file.path;

    // Step 1: Parse PDF (Tamil)
    const tamilText = await parsePdf(filePath);

    // Step 2: Translate to English
    const translatedText = await translateTamilToEnglish(tamilText);

    // Step 3: Extract transaction fields
    const transactions = parseTransactionsFromText(translatedText);

    res.status(200).json({
      message: "Successfully parsed and translated",
      transactions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process PDF" });
  }
};