import React, { useState, useMemo } from "react"
import UniversalDataViewer from "universal-data-tool/components/UniversalDataViewer"
import useEventCallback from "use-event-callback"
import TimeElapsed from "../TimeElapsed"
import { colors, Button, Box, Paper, styled } from "@material-ui/core"

const TestHeader = styled(Box)({
  flexGrow: 1,
  fontSize: 18,
  color: colors.grey[800],
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

export const TestCourseItem = ({ test, dataset }) => {
  const [
    { isTakingTest, startTime, testFailReason },
    setIsTakingTest,
  ] = useState({
    isTakingTest: false,
  })
  const datasetWithoutAnnotations = useMemo(() => {
    return {
      ...dataset,
      samples: dataset.samples.map((s) => ({ ...s, annotation: null })),
    }
  }, [dataset])
  const finishTest = useEventCallback(() => {
    const timeTaken = Date.now() - startTime
    if (test.timeAllowed && timeTaken >= test.timeAllowed * 1000) {
      setIsTakingTest({
        isTakingTest: false,
        testFailReason: "Ran out of time",
      })
      return
    }
    setIsTakingTest({ isTakingTest: false })
  })
  return (
    <Box marginTop={4} marginBottom={4}>
      <Paper>
        <Box padding={4} display="flex" alignItems="center">
          <TestHeader>
            <div>
              <b>Test: {test.name}</b> ({dataset.samples.length} Problem
              {dataset.samples.length > 1 ? "s" : ""})
            </div>
            {testFailReason && (
              <Box color="#f00" paddingTop={2} fontWeight="bold">
                {testFailReason}
              </Box>
            )}
          </TestHeader>
          <Box textAlign="right">
            {!isTakingTest && (
              <StyledButton
                onClick={() =>
                  setIsTakingTest({ isTakingTest: true, startTime: Date.now() })
                }
                variant="outlined"
              >
                {testFailReason ? "Retry Test" : "Start Test"}
              </StyledButton>
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
              onSaveTaskOutputItem={(...args) => {
                console.log("onSaveTaskOutputItem", ...args)
              }}
              onExit={finishTest}
            />
          )}
        </Box>
      </Paper>
    </Box>
  )
}

export default TestCourseItem
