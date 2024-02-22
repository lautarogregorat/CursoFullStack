import React from "react"
import Header from "./Header"

const Course = ({ course }) => {
    
    return (
        <>
        <h1>{course.name}</h1>
        <Header parts = {course.parts} ></Header>
        </>
    )
}

export default Course