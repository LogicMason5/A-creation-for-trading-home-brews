import express from 'express';
import cors from 'cors';
import { default as offerRouter } from './controllers/offers';
const app = express();
app.use(express.json());
app.use(cors());
app.use('/', offerRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});