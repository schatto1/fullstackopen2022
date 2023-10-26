import React from 'react'

const Header = ({ course }) => <h2>{course}</h2>

const Part = ({ part }) => {
  return (
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}

const Content = ({ parts }) => {
  let initialValue = 0;
  let exerciseSum = parts.reduce(
    (previousValue, currentValue) => {
      // console.log('what is happening', previousValue, currentValue.exercises)
      return previousValue + currentValue.exercises
    }
    , initialValue
  )

  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part} />)}
      <p><strong>total of {exerciseSum} exercises</strong></p>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Course