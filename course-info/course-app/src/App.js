import React from 'react';
import Course from './components/Course';
import Header from './components/Header';
import Total from './components/Total';

const Content = ({ parts }) => {
  console.log(parts)
  return (
      <div>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
  </div>
  )
}

const Part = ({part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
return (
  <Course
  courses={courses}
  Header={Header}
  Content={Content}
  Total={Total}
  />
)
}

export default App