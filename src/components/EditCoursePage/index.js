import React, { useEffect, useState } from "react"
import { styled, colors, CircularProgress, Box } from "@material-ui/core"
import { useParams } from "react-router-dom"
import qs from "qs"
import PageContainer from "../PageContainer"
import CourseEditor from "../CourseEditor"

const Container = styled("div")({})

export const EditCoursePage = () => {
  const { course_id } = useParams()
  const [students, setStudents] = useState(null)
  const { edit_key } = qs.parse(window.location.search.slice(1))
  const [course, setCourse] = useState()
  const loading = !course
  useEffect(() => {
    if (!edit_key || !course_id) return
    async function getCourse() {
      if (course) return
      const response = await fetch(
        `/courses/api/course/${course_id}?edit_key=${edit_key}`
      ).then((r) => r.json())
      if (!response.dataset.training) {
        response.dataset.training = {
          title: "New Course",
          completeMessage:
            "Thanks for taking this course!\n\nYour instructor has a special link that will allow them to see you've completed the course.",
          sections: [
            {
              name: "Introduction",
              items: [
                {
                  id: "1",
                  markdown:
                    "# About this dataset\n\nIt's a good idea to start a course by defining some of the things that labelers will need to know about the dataset, e.g. maybe you should tell them the motivation behind the labeling of this dataset.\n\nYou can click the Edit tab on any item to edit it's content. You can create new items using the little add icon at the bottom of items.\n\nIf you create tests or exercises, they're required to be completed before someone can move on from their current section.\n\nIncluding images in your markdown is cool but we don't host images so try throwing them up on imgur or AWS S3.",
                },
                {
                  id: "2",
                  question: {
                    type: "radiogroup",
                    title: "What is this dataset used for?",
                    choices: [
                      "Identifying the sentiment of cats",
                      "Classifying different kinds of fruits for machine conveyer systems",
                      "Something else!",
                    ],
                  },
                  answerIndex: 2,
                },
                {
                  id: "3",
                  dataset: {
                    interface: response.dataset.interface,
                    samples: (response.dataset.samples || []).slice(0, 1),
                  },
                },
              ],
            },
          ],
        }
      }
      setCourse(response)

      // Get students
      const studentsResponse = await fetch(
        `/courses/api/course/${course_id}/students`,
        {
          headers: { Authorization: edit_key },
        }
      ).then((r) => r.json())

      setStudents(studentsResponse.students)
    }
    getCourse()
  }, [edit_key, course_id])
  return (
    <PageContainer>
      {loading ? (
        <Box padding="100px" textAlign="center">
          <CircularProgress size={50} />
        </Box>
      ) : (
        <CourseEditor
          courseId={course_id}
          students={students}
          dataset={course.dataset}
          onChangeDataset={async (dataset) => {
            await fetch(`/courses/api/course/${course_id}`, {
              method: "PUT",
              body: JSON.stringify({ dataset }),
              headers: {
                "Content-Type": "application/json",
                Authorization: edit_key,
              },
            })
          }}
        />
      )}
    </PageContainer>
  )
}

export default EditCoursePage
