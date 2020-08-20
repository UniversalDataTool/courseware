import React, { useReducer } from "react"
import { styled, Box, colors, Button, IconButton } from "@material-ui/core"
import {
  LibraryAdd as LibraryAddIcon,
  Close as CloseIcon,
} from "@material-ui/icons"

const getRandomId = () => Math.random().toString(36).slice(-5)

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
              onAddItem({
                id: getRandomId(),
                markdown: "# Empty Markdown Item",
              })
              toggleOpen()
            }}
            variant="outlined"
          >
            Add Markdown Instructions
          </NewItemOption>
          <NewItemOption
            onClick={() => {
              onAddItem({
                id: getRandomId(),
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
                id: getRandomId(),
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
                id: getRandomId(),
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
