import React, { Fragment, useState } from "react"
import { styled, colors } from "@material-ui/core"
import range from "lodash/range"

const ErrorText = styled("div")({
  color: colors.red[500],
  fontWeight: "bold",
})
const TextArea = styled("textarea")({
  width: "100%",
  padding: 8,
})

export const EditSimpleQuestion = ({ value, onChange }) => {
  const { question, answerIndex } = value
  const [error, setError] = useState(null)
  const rendering = `
Question: ${question.title}
${question.choices.map((c, i) => `${i + 1}. ${c}`).join("\n")}
Answer: ${answerIndex + 1}
`.trim()
  return (
    <Fragment>
      {error && (
        <ErrorText>
          {error}
          <br />
          <br />
          Make sure to use this format:
          <br />
          Question: Some Question
          <br />
          1. Answer One
          <br />
          2. Answer Two
          <br />
          Answer: 1
        </ErrorText>
      )}
      <TextArea
        rows="6"
        onChange={(e) => {
          const stringVal = e.target.value
          try {
            const title = stringVal.match(/Question: (.*)/)[1]
            const choices = [...stringVal.matchAll(/[0-9]\. (.*)/g)].map(
              (m) => m[1]
            )
            const answerIndex =
              parseInt(stringVal.match(/Answer: ([0-9]+)/)[1]) - 1
            onChange({
              question: { title, choices },
              answerIndex,
            })
            if (error) {
              setError(null)
            }
          } catch (e) {
            setError(e.toString())
          }
        }}
        defaultValue={rendering}
      ></TextArea>
    </Fragment>
  )
}

export default EditSimpleQuestion
