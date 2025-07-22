import express from 'express';
import multer from 'multer';
import fs from 'fs/promises';

import { convertPdfToImages } from '../services/pdfToImage.js';
import { runOCR } from '../services/ocr.js';
import { translateToEnglish } from '../services/translate.js';

const upload = multer({ dest: './uploads' });
const router = express.Router();

router.post('/tesseract-translate', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;
  const outputDir = `./temp/${Date.now()}`;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const images = await convertPdfToImages(filePath, outputDir);

    for (let i = 0; i < images.length; i++) {
      const tamil = await runOCR(images[i]);
      const english = await translateToEnglish(tamil);
      res.write(`data: ${JSON.stringify({ page: i + 1, text: english })}\n\n`);
    }

    res.write('event: done\ndata: complete\n\n');
    res.end();

    // cleanup
    await fs.rm(outputDir, { recursive: true, force: true });
    await fs.unlink(filePath);
  } catch (err) {
    console.error(err);
    res.write(`event: error\ndata: ${err.message}\n\n`);
    res.end();
  }
});

export default router;