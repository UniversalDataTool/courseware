import React, { useState, useMemo, useRef } from "react"
import UniversalDataViewer from "universal-data-tool/components/UniversalDataViewer"
import useEventCallback from "use-event-callback"
import TimeElapsed from "../TimeElapsed"
import { colors, Typography, Button, Box, styled } from "@material-ui/core"
import StyledPaper from "../StyledPaper"
import SimpleDialog from "universal-data-tool/components/SimpleDialog"
import checkAnswer from "./check-answer"
import ReactMarkdown from "react-markdown"

const TestHeader = styled(Box)({
  flexGrow: 1,
  fontSize: 18,
  color: colors.grey[800],
})
const StyledButton = styled(Button)({
  textTransform: "none",
  fontSize: 18,
  margin: 8,
  backgroundColor: colors.blue[700],
  color: "#fff",
  "&:hover": {
    backgroundColor: colors.blue[800],
  },
})
const PassedText = styled(Button)({
  textTransform: "none",
  fontSize: 18,
  margin: 8,
  backgroundColor: colors.green[700],
  "&&&": {
    color: "#fff",
  },
  "&:hover": {
    backgroundColor: colors.green[700],
  },
})
const FeedbackText = styled(Typography)({
  color: colors.red[500],
  fontWeight: "bold",
  fontSize: 18,
})

export const TestCourseItem = ({ test, dataset }) => {
  const userAnswers = useRef([])
  const [feedback, setFeedback] = useState()
  const [
    { isTakingTest = false, startTime, testResults, passed = false },
    setIsTakingTest,
  ] = useState({})
  const [currentSampleIndex, setCurrentSampleIndex] = useState(0)
  const datasetWithoutAnnotations = useMemo(() => {
    return {
      ...dataset,
      samples: dataset.samples.map((s) => ({
        ...s,
        annotation:
          test.method === "classificationOnly"
            ? (s.annotation || []).map((a) => ({
                ...a,
                classification: undefined,
              }))
            : null,
      })),
    }
  }, [dataset])
  const finishTest = useEventCallback(() => {
    const timeTaken = Date.now() - startTime
    if (test.timeAllowed && timeTaken >= test.timeAllowed * 1000) {
      setIsTakingTest({
        isTakingTest: false,
        testResults: [{ type: "error", message: "Ran out of time" }],
      })
      return
    }
    // Check each answer
    let hasError = false
    const results = []
    for (const [
      sampleIndex,
      { annotation: solution },
    ] of dataset.samples.entries()) {
      let error = checkAnswer(test, solution, userAnswers.current[sampleIndex])
      if (error) {
        hasError = true
        error = `Problem with Sample ${sampleIndex + 1}: ${error}`
        results.push({ type: "error", message: error })
      } else {
        results.push({
          type: "correct",
          message: `Sample ${sampleIndex + 1} is correct!`,
        })
      }
    }

    if (hasError) {
      setIsTakingTest({
        isTakingTest: false,
        testResults: results,
        passed: false,
      })
    } else {
      setIsTakingTest({
        isTakingTest: false,
        testResults: results,
        passed: true,
      })
    }
  })
  return (
    <Box marginTop={4} marginBottom={4}>
      <StyledPaper>
        <Box padding={4} display="flex" alignItems="center">
          <TestHeader>
            <div>
              <b>Test: {test.name}</b> ({dataset.samples.length} Problem
              {dataset.samples.length > 1 ? "s" : ""})
            </div>
            {test.instructions && (
              <div>
                <ReactMarkdown source={test.instructions} />
              </div>
            )}
            {testResults &&
              testResults.map(({ type, message }) =>
                type === "error" ? (
                  <Box color="#f00" paddingTop={2} fontWeight="bold">
                    {message}
                  </Box>
                ) : (
                  <Box
                    color={colors.green[600]}
                    paddingTop={2}
                    fontWeight="bold"
                  >
                    {message}
                  </Box>
                )
              )}
          </TestHeader>
          <Box textAlign="right">
            {!isTakingTest && (
              <StyledButton
                onClick={() => {
                  userAnswers.current = []
                  setCurrentSampleIndex(0)
                  setIsTakingTest({ isTakingTest: true, startTime: Date.now() })
                }}
                variant="outlined"
              >
                {passed
                  ? "Retake Test"
                  : testResults
                  ? "Retry Test"
                  : "Start Test"}
              </StyledButton>
            )}
            {passed && (
              <PassedText variant="outlined" disabled>
                Passed!
              </PassedText>
            )}
            {isTakingTest && (
              <Box>
                <TimeElapsed
                  startTime={startTime}
                  timeAllowed={test.timeAllowed}
                  onTimeUp={() => finishTest()}
                />
              </Box>
            )}
          </Box>
        </Box>
        <Box>
          {isTakingTest && (
            <UniversalDataViewer
              dataset={datasetWithoutAnnotations}
              sampleIndex={currentSampleIndex}
              onSaveTaskOutputItem={(sampleIndex, answer) => {
                userAnswers.current[sampleIndex] = answer
              }}
              onExit={(action) => {
                if (test.exercise && action !== "go-to-previous") {
                  // make sure the user's answer is correct
                  const error = checkAnswer(
                    test,
                    dataset.samples[currentSampleIndex].annotation,
                    userAnswers.current[currentSampleIndex]
                  )
                  if (error) {
                    setFeedback(error)
                    return
                  }
                }

                if (action === "go-to-next") {
                  if (currentSampleIndex + 1 >= dataset.samples.length) {
                    finishTest()
                  } else {
                    setCurrentSampleIndex(currentSampleIndex + 1)
                  }
                } else if (action === "go-to-previous") {
                  setCurrentSampleIndex(currentSampleIndex - 1)
                } else if (!action) {
                  finishTest()
                }
              }}
            />
          )}
        </Box>
      </StyledPaper>
      <SimpleDialog
        title="Try Again!"
        onClose={() => setFeedback(null)}
        open={feedback}
      >
        <FeedbackText>{feedback}</FeedbackText>
      </SimpleDialog>
    </Box>
  )
}

export default TestCourseItem
