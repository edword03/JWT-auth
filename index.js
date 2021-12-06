import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './router/index.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

app.get('/', (req, res) => {
  res.status(200).json('started');
});

app.get('/users', (req, res) => {
  try {
    return res.json({ user: ['da', 'dd', 'bd'] });
  } catch (error) {
    res.status(500).json(error);
  }
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`server started on http://localhost:${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

startServer();
