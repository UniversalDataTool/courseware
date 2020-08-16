import React, { useState, useMemo, Fragment, memo } from "react"
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
import { from as makeImmutable, setIn } from "seamless-immutable"
import MarkdownEditor from "../MarkdownEditor"
import EditSimpleQuestion from "../EditSimpleQuestion"

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

const EditItem = memo(
  ({ item, onChange }) => {
    const [currentTab, setTab] = useState(0)
    console.log({ currentTab })
    return (
      <ItemEditContainer>
        <Box width="100%" display="flex">
          <Tabs value={currentTab} onChange={(e, ti) => setTab(ti)}>
            <Tab label="Preview" />
            {item.dataset && <Tab label="Select Samples" />}
            <Tab label="Edit" />
            {item.test && <Tab label="Configure Test" />}
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
        <Box marginTop={2}>
          {currentTab === 0 && <CourseItem {...item} />}
          {currentTab === 1 && item.markdown && (
            <MarkdownEditor
              value={item.markdown}
              onChange={(markdown) => onChange({ markdown })}
            />
          )}
          {currentTab === 1 && item.question && (
            <EditSimpleQuestion
              value={item}
              onChange={(newItem) => onChange(newItem)}
            />
          )}
        </Box>
      </ItemEditContainer>
    )
  },
  (prev, next) => {
    return prev.item === next.item
  }
)

export const CourseEditor = ({ dataset: datasetProp, onChangeDataset }) => {
  const [dataset, setDataset] = useState(makeImmutable(datasetProp))
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
            <Fragment key={sectionIndex}>
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
              {(section.items || []).map((item, itemIndex) => (
                <EditItem
                  key={itemIndex}
                  item={item}
                  onChange={(newValue) => {
                    setDataset(
                      dataset.setIn(
                        [
                          "training",
                          "sections",
                          sectionIndex,
                          "items",
                          itemIndex,
                        ],
                        newValue
                      )
                    )
                  }}
                />
              ))}
            </Fragment>
          )
        })}
      </CenteredContent>
    </Container>
  )
}

export default CourseEditor
