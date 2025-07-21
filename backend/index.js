import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
//import uploadRoutes from './routes/upload.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
//app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});