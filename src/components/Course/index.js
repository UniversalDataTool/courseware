import React, { useState } from "react"
import { styled, Typography, colors, Box, Button } from "@material-ui/core"
import { ArrowKeyboardRight as ArrowKeyboardRightIcon } from "@material-ui/icons"
import PageContainer from "../PageContainer"
import CenteredContent from "../CenteredContent"
import CourseItem from "../CourseItem"

const Title = styled(Typography)({
  display: "flex",
  fontSize: 24,
  fontWeight: 600,
  padding: 24,
  marginBottom: 16,
  borderBottom: `1px solid ${colors.grey[500]}`,
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

const Items = styled("div")({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
})

export const Course = ({ dataset }) => {
  const { training } = dataset
  const [sectionIndex, setSectionIndex] = useState(0)
  const section = training.sections[sectionIndex]
  const nextSection =
    sectionIndex + 1 < training.sections.length
      ? training.sections[sectionIndex + 1]
      : null
  return (
    <PageContainer>
      <CenteredContent>
        <Title>
          <Box flexGrow={1}>
            {training.title} | {section.name}
          </Box>
          <Box flexGrow={1} textAlign="right" color={colors.grey[600]}>
            Part {sectionIndex + 1} of {training.sections.length}
          </Box>
        </Title>
        <Items>
          {section.items.map((item, i) => (
            <CourseItem key={i} {...item} />
          ))}
        </Items>
        <Box marginTop={4} marginBottom={4} textAlign="right">
          <StyledButton variant="outlined">Submit</StyledButton>
        </Box>
      </CenteredContent>
    </PageContainer>
  )
}

export default Course
