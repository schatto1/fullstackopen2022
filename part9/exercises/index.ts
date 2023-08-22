import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    console.table(calculateBmi(height, weight));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Error: ' + error.message);
    }
  }
  res.send('Hello BMI Calculator!');
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});