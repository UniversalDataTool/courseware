import React from "react"
import { styled, colors } from "@material-ui/core"
import { useParams } from "react-router-dom"

const Container = styled("div")({})

export const CoursePage = () => {
  const { course_id } = useParams()
  return <Container>Course Page: {course_id}</Container>
}

export default CoursePage
