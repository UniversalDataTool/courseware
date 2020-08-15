import React, { useState } from "react"
import { Box, styled, Paper } from "@material-ui/core"
import ReactMarkdown from "react-markdown"
import UniversalDataViewer from "universal-data-tool/components/UniversalDataViewer"
import RadioGroupQuestion from "material-survey/components/RadiogroupQuestion"
import QuestionContext from "material-survey/components/QuestionContext"
import TestCourseItem from "../TestCourseItem"

const MarkdownBox = styled(Box)({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  "& h1": {
    marginLeft: 0,
  },
  "& img": {
    width: "100%",
    maxHeight: 400,
    objectFit: "contain",
    marginTop: 8,
    marginBottom: 8,
  },
})

export const CourseItem = ({
  markdown,
  dataset,
  question,
  answerIndex,
  exercise,
  test,
}) => {
  const [answer, setAnswer] = useState(null)

  if (markdown) {
    return (
      <MarkdownBox paddingTop={1} paddingBottom={1}>
        <ReactMarkdown source={markdown} escapeHtml />
      </MarkdownBox>
    )
  }

  if (dataset) {
    if (test) {
      return <TestCourseItem test={test} dataset={dataset} />
    }

    return (
      <Paper>
        <UniversalDataViewer dataset={dataset} onExit={console.log} />
      </Paper>
    )
  }

  if (question) {
    return (
      <Paper>
        <Box paddingTop={2} paddingLeft={2}>
          <QuestionContext.Provider
            value={{
              containerStyleType: "flat",
              error:
                answer !== null && answer !== question.choices[answerIndex]
                  ? "That answer is not correct!"
                  : null,
            }}
          >
            <RadioGroupQuestion
              onChangeAnswer={setAnswer}
              question={question}
            />
          </QuestionContext.Provider>
        </Box>
      </Paper>
    )
  }

  return null
}

export default CourseItem
