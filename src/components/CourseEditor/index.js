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
  Grid,
  TextField,
  Paper,
  Tabs,
  Button,
  Tab,
  IconButton,
  Tooltip,
} from "@material-ui/core"
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  LibraryAdd as LibraryAddIcon,
  Visibility as VisibilityIcon,
  CenterFocusStrong as CenterFocusStrongIcon,
  VisibilityOff as VisibilityOffIcon,
  Close as CloseIcon,
} from "@material-ui/icons"
import CourseItem from "../CourseItem"
import { from as makeImmutable, setIn } from "seamless-immutable"
import MarkdownEditor from "../MarkdownEditor"
import EditSimpleQuestion from "../EditSimpleQuestion"
import SelectSamplesFromDataset from "../SelectSamplesFromDataset"
import ConfigureTest from "../ConfigureTest"
import UniversalDataViewer from "universal-data-tool/components/UniversalDataViewer"
import { useDebounce } from "react-use"

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
const NewItemOption = styled(Button)({
  margin: 8,
  backgroundColor: "#fff",
})
const NewItemIconButton = styled(IconButton)({
  color: colors.grey[500],
})
const ContentsAreHidden = styled(Typography)({
  textAlign: "center",
  fontSize: 24,
  color: colors.grey[500],
})

const NewItemCreator = ({
  dataset,
  onAddItem,
  canAddSection,
  onAddSection,
}) => {
  const [open, toggleOpen] = useReducer((state) => !state, false)
  return (
    <Box flexGrow={1} textAlign="center">
      <NewItemIconButton onClick={toggleOpen}>
        {!open ? <LibraryAddIcon /> : <CloseIcon />}
      </NewItemIconButton>
      {open && (
        <Box marginTop={2}>
          <NewItemOption
            onClick={() => {
              onAddItem({ markdown: "# Empty Markdown Item" })
              toggleOpen()
            }}
            variant="outlined"
          >
            Add Markdown Instructions
          </NewItemOption>
          <NewItemOption
            onClick={() => {
              onAddItem({
                question: {
                  type: "radiogroup",
                  title: "Some question title",
                  choices: ["Answer One", "Answer Two"],
                },
                answerIndex: 0,
              })
              toggleOpen()
            }}
            variant="outlined"
          >
            Add Question
          </NewItemOption>
          <NewItemOption
            onClick={() => {
              onAddItem({
                dataset: {
                  interface: dataset.interface,
                  samples: [],
                },
              })
              toggleOpen()
            }}
            variant="outlined"
          >
            Add Data View
          </NewItemOption>
          <NewItemOption
            onClick={() => {
              onAddItem({
                dataset: {
                  interface: dataset.interface,
                  samples: [],
                },
                test: {},
              })
              toggleOpen()
            }}
            variant="outlined"
          >
            Add Test or Exercise
          </NewItemOption>
          <NewItemOption
            onClick={() => {
              onAddSection()
              toggleOpen()
            }}
            variant="outlined"
          >
            Add Section
          </NewItemOption>
        </Box>
      )}
    </Box>
  )
}

const EditItem = memo(
  ({ dataset, item, onChange, onMove, onDelete }) => {
    const [currentTab, setTab] = useState(0)
    const tabs = [
      "Preview",
      item.dataset && "Select Samples",
      "Edit",
      item.test && "Configure Test",
    ].filter(Boolean)
    const tabName = tabs[currentTab]
    return (
      <ItemEditContainer>
        <Box width="100%" display="flex">
          <Tabs value={currentTab} onChange={(e, ti) => setTab(ti)}>
            {tabs.map((t) => (
              <Tab key={t} label={t} />
            ))}
          </Tabs>
          <Box flexGrow={1} textAlign="right">
            <Tooltip title="Move Item Down">
              <IconButton onClick={() => onMove("down")}>
                <KeyboardArrowDownIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Move Item Up">
              <IconButton onClick={() => onMove("up")}>
                <KeyboardArrowUpIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Item">
              <IconButton onClick={onDelete}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Box marginTop={2}>
          {tabName === "Preview" && <CourseItem {...item} />}
          {tabName === "Edit" && item.markdown && (
            <MarkdownEditor
              value={item.markdown}
              onChange={(markdown) => onChange({ markdown })}
            />
          )}
          {tabName === "Edit" && item.question && (
            <EditSimpleQuestion
              value={item}
              onChange={(newItem) => onChange(newItem)}
            />
          )}
          {tabName === "Select Samples" && (
            <SelectSamplesFromDataset
              selection={item.dataset.samples || []}
              dataset={dataset}
              onChange={(newSamples) => {
                onChange(item.setIn(["dataset", "samples"], newSamples))
              }}
            />
          )}
          {tabName === "Edit" && item.dataset && (
            <UniversalDataViewer
              disableHotkeys
              dataset={item.dataset}
              onSaveTaskOutputItem={(sampleIndex, output) => {
                onChange(
                  item.setIn(
                    ["dataset", "samples", sampleIndex, "annotation"],
                    output
                  )
                )
              }}
            />
          )}
          {tabName === "Configure Test" && item.test && (
            <ConfigureTest
              test={item.test}
              dataset={dataset}
              onChange={(test) => onChange(item.setIn(["test"], test))}
            />
          )}
        </Box>
      </ItemEditContainer>
    )
  },
  (next, prev) => next.item === prev.item && next.key === prev.key
)

export const CourseEditor = ({ dataset: datasetProp, onChangeDataset }) => {
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
    training: { sections, title: courseTitle } = {
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
                      <EditItem
                        item={item}
                        key={`${itemIndex},${section.items.length}`}
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
      </CenteredContent>
    </Container>
  )
}

export default CourseEditor
