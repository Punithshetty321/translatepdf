import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import streamTranslate from './routes/streamTranslateTesseract.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', streamTranslate); 

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));