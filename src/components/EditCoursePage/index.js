import React from "react"
import { styled, colors } from "@material-ui/core"
import { useParams } from "react-router-dom"

const Container = styled("div")({})

export const EditCoursePage = () => {
  const { course_id } = useParams()
  return <Container>Edit Course, {course_id}</Container>
}

export default EditCoursePage
