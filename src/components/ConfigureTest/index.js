import React, { useMemo, useState } from "react"
import Survey from "material-survey/components/Survey"
import MarkdownEditor from "../MarkdownEditor"
import { Box, colors } from "@material-ui/core"

export const ConfigureTest = ({
  test,
  dataset: { interface: iface },
  onChange,
}) => {
  const defaultAnswers = useMemo(
    () => ({
      exercise: true,
      method: iface.type.includes("segmentation") ? "pixelIOU" : "exact",
      pixelIOUErrorAllowed: 0.2,
      ...test,
    }),
    [iface]
  )

  const form = useMemo(
    () => ({
      questions: [
        {
          name: "exercise",
          title: "Is this a practice exercise?",
          description:
            "Practice exercises give the user feedback after each submission. These are better for teaching the user.",
          type: "boolean",
        },
        {
          name: "method",
          title: "What testing method would you like to use?",
          type: "dropdown",
          choices: [
            !iface.type.includes("segmentation") && {
              value: "exact",
              text: "Answers should exactly match the solution",
            },
            iface.type.includes("segmentation") && {
              value: "pixelIOU",
              text:
                "Answers should be close to the solution, measured by pixel intersection over union",
            },
            iface.type.includes("segmentation") && {
              value: "classificationOnly",
              text: "Only label the classifications",
            },
          ].filter(Boolean),
        },
        {
          name: "pixelIOUErrorAllowed",
          title: "How much pixel IOU error is allowed?",
          type: "slider",
          visibleIf: '{method} == "pixelIOU"',
          min: 0.01,
          max: 0.99,
          step: 0.01,
        },
      ],
    }),
    [iface]
  )
  return (
    <>
      <Box
        fontSize={18}
        fontWeight="bold"
        colors={colors.grey[600]}
        paddingBottom={2}
      >
        Instructions
      </Box>
      <Box paddingBottom={2}>
        <MarkdownEditor
          value={test.instructions}
          onChange={(s) => {
            onChange(test.setIn(["instructions"], s))
          }}
        />
      </Box>
      <Survey
        noActions
        onQuestionChange={(questionId, newValue, answers) => {
          onChange(test.setIn([questionId], newValue))
        }}
        variant="flat"
        form={form}
        defaultAnswers={defaultAnswers}
      />
    </>
  )
}
export default ConfigureTest
