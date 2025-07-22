import Tesseract from 'tesseract.js';

export const runOCR = async (imagePath, lang = 'tam') => {
  const { data: { text } } = await Tesseract.recognize(imagePath, lang);
  return text;
};