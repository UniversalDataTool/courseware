import React, { useState, useEffect } from "react"
import { Box, Typography, styled, colors } from "@material-ui/core"
import ReactMarkdown from "react-markdown"
import UniversalDataViewer from "universal-data-tool/components/UniversalDataViewer"
import RadioGroupQuestion from "material-survey/components/RadiogroupQuestion"
import QuestionContext from "material-survey/components/QuestionContext"
import TestCourseItem from "../TestCourseItem"
import StyledPaper from "../StyledPaper"

const noop = () => {}

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
const PunishmentOverlay = styled(Typography)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  zIndex: 100,
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: "rgba(255,0,0,0.5)",
  color: "#fff",
  fontWeight: "bold",
  fontSize: 36,
  textShadow: "0px 2px 4px rgba(0,0,0,0.2)",
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
  const [punishingUser, setPunishingUser] = useState(false)
  useEffect(() => {
    if (punishingUser) {
      const timeout = setTimeout(() => {
        setPunishingUser(false)
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [punishingUser])

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
      <StyledPaper>
        <UniversalDataViewer
          disableHotkeys
          dataset={dataset}
          onExit={noop}
          onSaveTaskOutputItem={noop}
        />
      </StyledPaper>
    )
  }

  if (question) {
    return (
      <StyledPaper>
        <Box position="relative" paddingTop={2} paddingLeft={2}>
          {punishingUser && <PunishmentOverlay>Incorrect!</PunishmentOverlay>}
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
              key={punishingUser}
              onChangeAnswer={(newAnswer) => {
                if (newAnswer !== question.choices[answerIndex]) {
                  setPunishingUser(true)
                } else {
                  setAnswer(newAnswer)
                }
              }}
              question={question}
            />
          </QuestionContext.Provider>
        </Box>
      </StyledPaper>
    )
  }

  return null
}

export default CourseItem
