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

// const App = ({ notes }) => {
//   return (
//     <div>
//       <h1>Notes</h1>
//       <ul>
//         {notes.map(note =>
//           <Note key={note.id} note={note} />
//         )}
//       </ul>
//     </div>
//   )
// }

const App = () => {
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map(course =>
          <Course key={course.id} course={course} />)}
    </div>
  )
}

export default App