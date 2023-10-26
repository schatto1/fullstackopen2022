import express from 'express';
const app = express();

import { calculateBmi } from './bmiCalculator';
import { calcualateExercises } from './exerciseCalculator';

app.use(express.json());

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

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const rating = calcualateExercises(req.body.target, req.body.daily_exercises);
    res.json(rating);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Error: ' + error.message);
    }
  } 
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});