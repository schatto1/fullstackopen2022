import { CoursePart } from "../types";
import React from "react";

const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {

  return (
    <div>
      Total number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>
  );
};

export default Total;