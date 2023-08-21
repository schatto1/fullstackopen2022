interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (a: number, b: number) => {

  const bmi = b / (Math.pow((a/100), 2));

  let message = "";

  if (bmi >= 40) {
    message = "Obese"
  }
  else if (bmi >= 25) {
    message = "Overweight"
  }
  else if (bmi >= 18.5) {
    message = "Normal (healthy weight)"
  }
  else if (bmi <= 18.4) {
    message = "Underweight"
  }
  else {
    message = "Something went wrong"
  }

  console.log(message);
}

try {
  const { height, weight } = parseArguments(process.argv);
  calculateBmi(height, weight);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}