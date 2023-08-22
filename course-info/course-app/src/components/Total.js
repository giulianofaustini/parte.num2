import React from "react"



const Total = ({ parts }) => {  
    const totalExercises = parts.reduce((sum, n) => sum + n.exercises, 0)
    return (
      <h3>A total of {totalExercises} exercises </h3>
    )
  }
  

  export default Total