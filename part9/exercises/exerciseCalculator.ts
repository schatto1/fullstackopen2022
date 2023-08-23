interface ExerciseValues {
  target: number;
  data: Array<number>;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const isNotNumber = (argument: unknown): boolean =>
  isNaN(Number(argument));

export const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  for (let i = 2; i < args.length; i++) {
    if (isNotNumber(args[i])) {
      throw new Error('Provided values were not numbers!');
    }
  }

  const params = args.slice(3);

  const data = params.map(element => {
    return parseInt(element);
  });

  return {
    target: Number(args[2]),
    data: data
  };
};

const calcualateExercises = (target: number, exerciseHours: Array<number>): Result => {
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
    ratingDescription = 'not too bad but could be better';
  }
  else if (rating === 2) {
    ratingDescription = 'right on!';
  }
  else if (rating === 3) {
    ratingDescription = 'leave some for the rest of us';
  }

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  };
};

try {
  const { target, data } = parseArguments(process.argv);
  console.table(calcualateExercises(target, data));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}