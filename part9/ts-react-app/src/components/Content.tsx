import { CoursePart } from "../types";
import React from "react";

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {

  console.log(part)
  // return (
  //   <div>
  //     {part.name} {part.exerciseCount}
  //   </div>
  // )

  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h2>{part.name}</h2>
          <p>description: {part.description}</p>
          <p>number of exercises: {part.exerciseCount}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h2>{part.name}</h2>
          <p>number of exercises: {part.exerciseCount}</p>
          <p>number of group projects: {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h2>{part.name}</h2>
          <p>description: {part.description}</p>
          <p>background material: {part.backgroundMaterial}</p>
          <p>number of exercises: {part.exerciseCount}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <h2>{part.name}</h2>
          <p>description: {part.description}</p>
          <p>
            Requirements: 
            {part.requirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </p>
          <p>number of exercises: {part.exerciseCount}</p>
        </div>
      );
  }
};

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {

  return (
    <div>
      {courseParts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
};

export default Content;