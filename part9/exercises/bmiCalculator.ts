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

export const calculateBmi = (height: number, weight: number) => {

  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    throw new Error('malformed parameters');
  }

  const bmi = weight / (Math.pow((height/100), 2));

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

  return {
    weight: weight,
    height: height,
    bmi: message
  }
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