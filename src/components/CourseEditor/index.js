import React, { useState } from "react"
import CenteredContent from "../CenteredContent"
import {
  styled,
  Box,
  Typography,
  colors,
  Grid,
  TextField,
  Paper,
  Tabs,
  Tab,
  IconButton,
} from "@material-ui/core"
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Close as CloseIcon,
} from "@material-ui/icons"
import CourseItem from "../CourseItem"

const innerContentStyle = {
  display: "flex",
  flexDirection: "column",
}
const Container = styled(Box)({
  backgroundColor: colors.grey[100],
  padding: 40,
})
const PageTitle = styled(Typography)({
  fontSize: 24,
  color: colors.grey[700],
  fontWeight: "bold",
})
const SectionBuffer = styled(Typography)({
  marginTop: 128,
  marginBottom: 32,
  paddingBottom: 8,
  color: colors.grey[800],
  fontWeight: "bold",
  fontSize: 32,
  borderBottom: `2px solid ${colors.grey[500]}`,
})
const PageOrSectionEditContainer = styled(Paper)({
  display: "flex",
  border: `1px solid ${colors.grey[400]}`,
  padding: 24,
  marginTop: 32,
})
const ItemEditContainer = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  border: `1px solid ${colors.grey[400]}`,
  padding: 24,
  marginTop: 32,
})

const EditItem = ({ item }) => {
  const [currentTab, setTab] = useState(1)
  return (
    <ItemEditContainer>
      <Box width="100%" display="flex">
        <Tabs value={currentTab} onChange={(e, ti) => setTab(ti)}>
          <Tab label="Edit" />
          <Tab label="Preview" />
        </Tabs>
        <Box flexGrow={1} textAlign="right">
          <IconButton>
            <KeyboardArrowDownIcon />
          </IconButton>
          <IconButton>
            <KeyboardArrowUpIcon />
          </IconButton>
          <IconButton>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Box marginTop={2}>{currentTab === 1 && <CourseItem {...item} />}</Box>
    </ItemEditContainer>
  )
}

export const CourseEditor = ({ dataset, onChangeDataset }) => {
  const {
    training: { sections, title: courseTitle } = {
      sections: [],
      title: "Untitled Course",
    },
  } = dataset
  return (
    <Container>
      <CenteredContent contentStyle={innerContentStyle}>
        <PageTitle>Edit Course</PageTitle>
        <PageOrSectionEditContainer>
          <TextField label="Course Title" value={courseTitle} />
        </PageOrSectionEditContainer>
        {sections.map((section, sectionIndex) => {
          return (
            <>
              <SectionBuffer>
                Section {sectionIndex + 1}: {section.name}
              </SectionBuffer>
              <PageOrSectionEditContainer>
                <TextField label="Section Title" value={section.name} />
                <Box flexGrow={1} textAlign="right">
                  <IconButton>
                    <KeyboardArrowDownIcon />
                  </IconButton>
                  <IconButton>
                    <KeyboardArrowUpIcon />
                  </IconButton>
                  <IconButton>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </PageOrSectionEditContainer>
              {(section.items || []).map((item, i) => (
                <EditItem key={i} item={item} />
              ))}
            </>
          )
        })}
      </CenteredContent>
    </Container>
  )
}

export default CourseEditor
