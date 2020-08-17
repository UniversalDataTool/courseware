import React, { useState, Fragment } from "react"
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

const Items = styled("div")({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  "& > *": {
    marginTop: 32,
  },
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
            <CourseItem key={i} {...item} />
          ))}
        </Items>
        <Box marginTop={4} marginBottom={4} textAlign="right">
          <StyledButton variant="outlined">Submit</StyledButton>
        </Box>
      </CenteredContent>
    </Fragment>
  )
}

export default Course
