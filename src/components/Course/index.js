import React, { useState, Fragment, useReducer, useMemo } from "react"
import { styled, Typography, colors, Box, Button } from "@material-ui/core"
import { AssignmentTurnedIn } from "@material-ui/icons"
import CenteredContent from "../CenteredContent"
import CourseItem from "../CourseItem"
import SimpleDialog from "universal-data-tool/components/SimpleDialog"
import ReactMarkdown from "react-markdown"
import Survey from "material-survey/components/Survey"

const Title = styled(Typography)({
  display: "flex",
  fontSize: 24,
  fontWeight: 600,
  padding: 24,
  marginBottom: 16,
  backgroundColor: "#fff",
  borderBottom: `1px solid ${colors.grey[400]}`,
  boxShadow: "0px 3px 5px rgba(0,0,0,0.05)",
  "& .partcounter": {
    flexGrow: 1,
    textAlign: "right",
    color: colors.grey[600],
    fontWeight: "normal",
    fontSize: 14,
  },
  "& .section": {
    marginLeft: 8,
    borderLeft: `1px solid ${colors.grey[500]}`,
    paddingLeft: 8,
    color: colors.grey[600],
  },
})

const StyledButton = styled(Button)({
  textTransform: "none",
  fontSize: 18,
  backgroundColor: colors.blue[700],
  color: "#fff",
  "&:hover": {
    backgroundColor: colors.blue[800],
  },
})
const FadedStyledButton = styled(StyledButton)({
  opacity: 0.5,
  backgroundColor: colors.red[700],
  "&&&": {
    color: "#fff",
  },
  "&:hover": {
    backgroundColor: colors.red[700],
  },
})

const Items = styled("div")({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  "& > *": {
    marginTop: 32,
  },
})

export const Course = ({ dataset, onSubmit }) => {
  const { training } = dataset
  const [courseComplete, setCourseComplete] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [sectionIndex, setSectionIndex] = useState(0)
  const section = training.sections[sectionIndex]
  const nextSection =
    sectionIndex + 1 < training.sections.length
      ? training.sections[sectionIndex + 1]
      : null
  const [testStatuses, setTestComplete] = useReducer(
    (state, testi) => (testi === "reset" ? {} : { ...state, [testi]: true }),
    {}
  )
  const testsAreComplete = useMemo(
    () =>
      section.items.every((item, i) =>
        item.test || item.question ? testStatuses[i] : true
      ),
    [testStatuses, section]
  )
  return (
    <Fragment>
      <Title>
        <CenteredContent>
          <Box display="flex" alignItems="center">
            <Box flexGrow={1}>
              <span>{training.title}</span>
              <span className="section">{section.name}</span>
            </Box>
            <Box className="partcounter">
              Part {sectionIndex + 1} of {training.sections.length}
            </Box>
          </Box>
        </CenteredContent>
      </Title>
      <CenteredContent>
        <Items>
          {section.items.map((item, i) => (
            <CourseItem
              key={i}
              onCompleteTest={() => setTestComplete(i)}
              {...item}
            />
          ))}
        </Items>
        <Box marginTop={4} marginBottom={4} textAlign="right">
          {testsAreComplete ? (
            <StyledButton
              onClick={() => {
                if (nextSection) {
                  setTestComplete("reset")
                  setSectionIndex(sectionIndex + 1)
                } else {
                  setCourseComplete(true)
                }
              }}
              variant="outlined"
            >
              Submit
            </StyledButton>
          ) : (
            <FadedStyledButton disabled variant="outlined">
              Complete All Exercises to Continue
            </FadedStyledButton>
          )}
        </Box>
      </CenteredContent>
      {courseComplete && (
        <SimpleDialog title="Course Passed!" open onClose={() => null}>
          <ReactMarkdown source={dataset.training.completeMessage} />
          {!hasSubmitted ? (
            <Box paddingBottom={2}>
              <Survey
                form={{
                  questions: [
                    {
                      type: "text",
                      name: "name",
                      title: "Name",
                    },
                    {
                      type: "text",
                      name: "email",
                      title: "Email",
                    },
                  ],
                }}
                variant="flat"
                onFinish={async (contactInfo) => {
                  await onSubmit({ contactInfo })
                  setHasSubmitted(true)
                }}
                completeText="Save My Certification"
              />
            </Box>
          ) : (
            <Box
              height={200}
              alignItems="center"
              justifyContent="center"
              display="flex"
            >
              <AssignmentTurnedIn
                style={{ width: 100, height: 100, color: colors.green[500] }}
              />
            </Box>
          )}
        </SimpleDialog>
      )}
    </Fragment>
  )
}

export default Course
