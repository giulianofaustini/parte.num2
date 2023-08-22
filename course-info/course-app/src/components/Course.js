import React from 'react'


const Course = ({ courses, Header, Content, Total }) => {
    console.log(courses)
    return (
      <div>
        <Header course={courses[0]} />
        <Content parts={courses[0].parts}/>
        <Total parts={courses[0].parts} />
        <Header course={courses[1]} />
        <Content parts={courses[1].parts} />
        <Total parts={courses[1].parts} />
      </div>
  )
}
  
export default Course
