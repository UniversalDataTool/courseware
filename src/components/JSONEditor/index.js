import React, { Fragment, useState } from "react"
import { styled, colors, Button, Box } from "@material-ui/core"

const ErrorText = styled("div")({
  marginTop: 8,
  marginBottom: 8,
  color: colors.red[500],
})
const StyledButton = styled(Button)({ margin: 8 })
const TextArea = styled("textarea")({
  width: "100%",
  padding: 8,
})

export const JSONEditor = ({ json, onSave }) => {
  const [text, setText] = useState(JSON.stringify(json, null, "  "))
  let error, currentJSONValue
  try {
    currentJSONValue = JSON.parse(text)
  } catch (e) {
    error = e.toString()
  }
  return (
    <Fragment>
      {error && <ErrorText>{error}</ErrorText>}
      <TextArea
        rows="20"
        onChange={(e) => {
          const stringVal = e.target.value
          setText(stringVal)
        }}
        defaultValue={text}
      ></TextArea>
      <Box textAlign="right">
        <StyledButton
          disabled={error}
          color="primary"
          variant="contained"
          onClick={() => {
            onSave(currentJSONValue)
          }}
        >
          Save
        </StyledButton>
      </Box>
    </Fragment>
  )
}

export default JSONEditor
