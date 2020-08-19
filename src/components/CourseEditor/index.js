import React, {
  useState,
  useMemo,
  Fragment,
  memo,
  useReducer,
  useEffect,
} from "react"
import CenteredContent from "../CenteredContent"
import {
  styled,
  Box,
  Typography,
  colors,
  TextField,
  Paper,
  Button,
  IconButton,
  Tooltip,
} from "@material-ui/core"
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Visibility as VisibilityIcon,
  CenterFocusStrong as CenterFocusStrongIcon,
  VisibilityOff as VisibilityOffIcon,
  Close as CloseIcon,
} from "@material-ui/icons"
import { from as makeImmutable } from "seamless-immutable"
import MarkdownEditor from "../MarkdownEditor"
import { useDebounce } from "react-use"
import StudentsDialog from "../StudentsDialog"
import NewItemCreator from "../NewItemCreator"
import EditCourseItem from "../EditCourseItem"

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
  display: "flex",
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
const ContentsAreHidden = styled(Typography)({
  textAlign: "center",
  fontSize: 24,
  color: colors.grey[500],
})
const RightSideWithMargin = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  flexGrow: 1,
  "& > *": {
    margin: 8,
  },
})

export const CourseEditor = ({
  dataset: datasetProp,
  courseId,
  students,
  onChangeDataset,
}) => {
  if (!students) students = []
  const [studentDialogOpen, toggleStudentDialogOpen] = useReducer(
    (s) => !s,
    false
  )
  const [dataset, setDataset] = useState(() => {
    const dataset = makeImmutable(datasetProp)
    // Add ids to sections to make rendering keying easier
    return dataset.setIn(
      ["training", "sections"],
      dataset.training.sections.map((s) =>
        s.id ? s : s.set("id", Math.random().toString(36).slice(-5))
      )
    )
  })
  const [hiddenSections, setHiddenSections] = useState([])
  const {
    training: { sections, title: courseTitle, completeMessage } = {
      sections: [],
      title: "Untitled Course",
    },
  } = dataset
  useDebounce(() => onChangeDataset(dataset), 10000, [dataset])

  return (
    <Container>
      <CenteredContent contentStyle={innerContentStyle}>
        <PageTitle>Edit Course</PageTitle>
        <PageOrSectionEditContainer>
          <TextField
            label="Course Title"
            value={courseTitle}
            onChange={(e) =>
              setDataset(dataset.setIn(["training", "title"], e.target.value))
            }
          />
          <RightSideWithMargin>
            <Button href={`/courses/course/${courseId}`} variant="outlined">
              Go to Course
            </Button>
            <Button
              onClick={toggleStudentDialogOpen}
              disabled={!students.length}
              variant="outlined"
            >
              {students.length} Passing Students
            </Button>
          </RightSideWithMargin>
        </PageOrSectionEditContainer>
        {sections.map((section, sectionIndex) => {
          const hidden = hiddenSections.includes(section.name)
          return (
            <Fragment key={section.id}>
              <SectionBuffer className={hidden ? "hidden" : ""}>
                Section {sectionIndex + 1}: {section.name}
                <Box flexGrow={1} textAlign="right">
                  <Tooltip title="Hide All Other Sections">
                    <IconButton
                      onClick={() => {
                        setHiddenSections(
                          sections
                            .map((s) => s.name)
                            .filter((n) => n !== section.name)
                        )
                      }}
                    >
                      <CenterFocusStrongIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Show/Hide Section">
                    <IconButton
                      onClick={() => {
                        if (hidden) {
                          setHiddenSections(
                            hiddenSections.filter((hs) => hs !== section.name)
                          )
                        } else {
                          setHiddenSections(
                            hiddenSections.concat([section.name])
                          )
                        }
                      }}
                    >
                      {hidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </Tooltip>
                </Box>
              </SectionBuffer>
              {hidden ? (
                <ContentsAreHidden>
                  Contents are hidden (click the eye to show)
                </ContentsAreHidden>
              ) : (
                <Fragment>
                  <PageOrSectionEditContainer>
                    <TextField
                      label="Section Title"
                      value={section.name}
                      onChange={(e) => {
                        setDataset(
                          dataset.setIn(
                            ["training", "sections", sectionIndex, "name"],
                            e.target.value
                          )
                        )
                      }}
                    />
                    <Box flexGrow={1} textAlign="right">
                      <Tooltip title="Move Section Down">
                        <IconButton
                          onClick={() => {
                            if (sectionIndex === sections.length - 1) return
                            setDataset(
                              dataset.setIn(
                                ["training", "sections"],
                                [
                                  ...sections.slice(0, sectionIndex),
                                  sections[sectionIndex + 1],
                                  section,
                                  ...sections.slice(sectionIndex + 2),
                                ]
                              )
                            )
                          }}
                        >
                          <KeyboardArrowDownIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Move Section Up">
                        <IconButton
                          onClick={() => {
                            if (sectionIndex === 0) return
                            setDataset(
                              dataset.setIn(
                                ["training", "sections"],
                                [
                                  ...sections.slice(0, sectionIndex - 1),
                                  section,
                                  sections[sectionIndex - 1],
                                  ...sections.slice(sectionIndex + 1),
                                ]
                              )
                            )
                          }}
                        >
                          <KeyboardArrowUpIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Section">
                        <IconButton
                          onClick={() => {
                            if (section.items.length > 2) {
                              if (
                                !window.confirm(
                                  "Are you sure? This section has more than 2 items in it. They'll all be deleted."
                                )
                              ) {
                                return
                              }
                            }
                            setDataset(
                              dataset.setIn(
                                ["sections"],
                                [
                                  ...sections.slice(0, sectionIndex),
                                  ...sections.slice(sectionIndex + 1),
                                ]
                              )
                            )
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </PageOrSectionEditContainer>
                  <NewItemCreator
                    dataset={dataset}
                    onAddItem={(item) => {
                      setDataset(
                        dataset.setIn(
                          ["training", "sections", sectionIndex, "items"],
                          [item].concat(section.items)
                        )
                      )
                    }}
                  />
                  {(section.items || []).map((item, itemIndex) => (
                    <Fragment key={itemIndex}>
                      <EditCourseItem
                        key={item.id || itemIndex}
                        item={item}
                        dataset={dataset}
                        onMove={(direction) => {
                          if (direction === "up" && itemIndex !== 0) {
                            setDataset(
                              dataset.setIn(
                                ["training", "sections", sectionIndex, "items"],
                                [
                                  ...section.items.slice(0, itemIndex - 1),
                                  item,
                                  section.items[itemIndex - 1],
                                  ...section.items.slice(itemIndex + 1),
                                ]
                              )
                            )
                          } else if (
                            direction === "down" &&
                            itemIndex !== section.items.length - 1
                          ) {
                            setDataset(
                              dataset.setIn(
                                ["training", "sections", sectionIndex, "items"],
                                [
                                  ...section.items.slice(0, itemIndex),
                                  section.items[itemIndex + 1],
                                  item,
                                  ...section.items.slice(itemIndex + 2),
                                ]
                              )
                            )
                          }
                        }}
                        onDelete={() => {
                          setDataset(
                            dataset.setIn(
                              ["training", "sections", sectionIndex, "items"],
                              [
                                ...section.items.slice(0, itemIndex),
                                ...section.items.slice(itemIndex + 1),
                              ]
                            )
                          )
                        }}
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
                      <NewItemCreator
                        dataset={dataset}
                        canAddSection={itemIndex === section.items.length - 1}
                        onAddSection={() => {
                          setDataset(
                            dataset.setIn(
                              ["training", "sections"],
                              [
                                ...sections.slice(0, sectionIndex + 1),
                                {
                                  name: "New Section",
                                  items: [],
                                },
                                ...sections.slice(sectionIndex + 1),
                              ]
                            )
                          )
                        }}
                        onAddItem={(item) => {
                          setDataset(
                            dataset.setIn(
                              ["training", "sections", sectionIndex, "items"],
                              [
                                ...section.items.slice(0, itemIndex + 1),
                                item,
                                ...section.items.slice(itemIndex + 1),
                              ]
                            )
                          )
                        }}
                      />
                    </Fragment>
                  ))}
                </Fragment>
              )}
            </Fragment>
          )
        })}
        <SectionBuffer>After the Course</SectionBuffer>
        <ItemEditContainer>
          <Box fontWeight="bold" fontSize={18} marginTop={1} marginBottom={3}>
            Course Completion Message:
          </Box>
          <MarkdownEditor
            value={completeMessage}
            onChange={(markdown) =>
              setDataset(
                dataset.setIn(["training", "completeMessage"], markdown)
              )
            }
          />
        </ItemEditContainer>
      </CenteredContent>
      <StudentsDialog
        open={studentDialogOpen}
        onClose={toggleStudentDialogOpen}
        students={students}
      />
    </Container>
  )
}

export default CourseEditor
