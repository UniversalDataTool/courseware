import React, { useState, useEffect } from "react"
import { styled, colors, Box, CircularProgress } from "@material-ui/core"
import { useParams } from "react-router-dom"
import PageContainer from "../PageContainer"
import Course from "../Course"

const Container = styled("div")({})

export const CoursePage = () => {
  const { course_id } = useParams()
  const [course, setCourse] = useState()
  const loading = !course
  useEffect(() => {
    if (!course_id) return
    async function getCourse() {
      const response = await fetch(
        `/courses/api/course/${course_id}?avoid_cache=${Math.random()
          .toString(36)
          .slice(-4)}`
      ).then((r) => r.json())
      setCourse(response)
    }
    getCourse()
  }, [course_id])

  return (
    <PageContainer>
      {loading ? (
        <Box padding="100px" textAlign="center">
          <CircularProgress size={50} />
        </Box>
      ) : (
        <Course
          dataset={course.dataset}
          onSubmit={async ({ contactInfo }) => {
            await fetch(`/courses/api/course/${course_id}/submit`, {
              method: "POST",
              body: JSON.stringify({
                course_id,
                contact_info: contactInfo,
              }),
              headers: { "Content-Type": "application/json" },
            })
          }}
        />
      )}
    </PageContainer>
  )
}

export default CoursePage
