import React, { useState, memo } from "react"
import {
  styled,
  Box,
  colors,
  Paper,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
} from "@material-ui/core"
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Close as CloseIcon,
} from "@material-ui/icons"
import CourseItem from "../CourseItem"
import MarkdownEditor from "../MarkdownEditor"
import EditSimpleQuestion from "../EditSimpleQuestion"
import SelectSamplesFromDataset from "../SelectSamplesFromDataset"
import ConfigureTest from "../ConfigureTest"
import UniversalDataViewer from "universal-data-tool/components/UniversalDataViewer"
import withSolutionOptions from "./with-solution-options"
import JSONEditor from "../JSONEditor"
import useEventCallback from "use-event-callback"

const ItemEditContainer = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  border: `1px solid ${colors.grey[400]}`,
  padding: 24,
  marginTop: 32,
})

const EditCourseItemInnerMemo = memo(
  ({ dataset, item, onChange, onMove, onDelete }) => {
    const [currentTab, setTab] = useState(0)
    const tabs = [
      "Preview",
      item.dataset && "Select Samples",
      item.test ? "Edit Solution" : "Edit",
      item.test && "Configure Test",
      "JSON",
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
          {(tabName === "Edit" || tabName === "Edit Solution") && item.dataset && (
            <UniversalDataViewer
              disableHotkeys
              dataset={
                tabName === "Edit Solution"
                  ? withSolutionOptions(item.dataset)
                  : item.dataset
              }
              onModifySample={(sampleIndex, modifications) => {
                onChange(
                  item.setIn(
                    ["dataset", "samples", sampleIndex],
                    item
                      .getIn(["dataset", "samples", sampleIndex])
                      .merge(modifications)
                  )
                )
              }}
            />
          )}
          {tabName === "Configure Test" && item.test && (
            <ConfigureTest
              test={item.test}
              dataset={item.dataset}
              onChange={(test) => onChange(item.setIn(["test"], test))}
            />
          )}
          {tabName === "JSON" && (
            <JSONEditor
              json={{ ...item, id: undefined }}
              onSave={(newJSON) => onChange(newJSON)}
            />
          )}
        </Box>
      </ItemEditContainer>
    )
  },
  (next, prev) => next.item === prev.item
)

const EditCourseItem = ({
  dataset,
  item,
  onChange: onChangeProp,
  onMove: onMoveProp,
  onDelete: onDeleteProp,
}) => {
  // Bind to latest func without component rerenders
  const onChange = useEventCallback(onChangeProp)
  const onMove = useEventCallback(onMoveProp)
  const onDelete = useEventCallback(onDeleteProp)
  return (
    <EditCourseItemInnerMemo
      dataset={dataset}
      item={item}
      onChange={onChange}
      onMove={onMove}
      onDelete={onDelete}
    />
  )
}

// memo(
// com
//   (next, prev) => next.item === prev.item
// )

export default EditCourseItem
