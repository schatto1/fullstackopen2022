import { CourseProps } from "../types";

const Total = (props: CourseProps) => {

  return (
    <div>
      Number of exercises{" "}
      {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </div>
  );
};

export default Total;