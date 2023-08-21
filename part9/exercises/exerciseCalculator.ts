interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calcualateExercises = (exerciseHours: Array<number>, target: number): Result => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter(hour => hour !== 0).length;
  const average = exerciseHours.reduce((a, b) => (a + b)) / exerciseHours.length;
  let success = false;
  let rating = 0;
  let ratingDescription = 'oops - could not determine';

  if (average < target) {
    rating = 1;
  }
  else if (average >= target ) {
    rating = 2;
    success = true;
  }
  else if (average >= target * 2) {
    rating = 3;
    success = true;
  }

  if (rating === 1) {
    ratingDescription = 'not too bad but could be better'
  }
  else if (rating === 2) {
    ratingDescription = 'right on!'
  }
  else if (rating === 3) {
    ratingDescription = 'leave some for the rest of us'
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  }
}

try {
  console.table(calcualateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}