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
import StudentsDialog from "../StudentsDialog"
import JSONEditor from "../JSONEditor"

const NewItemOption = styled(Button)({
  margin: 8,
  backgroundColor: "#fff",
})
const NewItemIconButton = styled(IconButton)({
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

export default NewItemCreator
