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
  calculateBmi(180, 74);
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}