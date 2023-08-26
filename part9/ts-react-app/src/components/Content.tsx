import { PartProps, CourseProps } from "../types";

const CoursePart = (props: PartProps) => {

  return (
    <div>
      {props.part.name} {props.part.exerciseCount}
    </div>
  );
};

const Content = (props: CourseProps) => {

  return (
    <div>
      <CoursePart part={props.parts[0]} />
      <CoursePart part={props.parts[1]} />
      <CoursePart part={props.parts[2]} />
    </div>
  );
};

export default Content;