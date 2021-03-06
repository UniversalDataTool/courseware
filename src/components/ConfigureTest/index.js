import React, { useMemo, useState, useEffect } from "react"
import Survey from "material-survey/components/Survey"
import MarkdownEditor from "../MarkdownEditor"
import { Box, colors } from "@material-ui/core"

export const ConfigureTest = ({
  test,
  dataset: { interface: iface, samples },
  onChange,
}) => {
  const defaultAnswers = useMemo(
    () => ({
      exercise: true,
      method: iface.type.includes("segmentation") ? "iou" : "exact",
      iouErrorThreshold: 0.2,
      ...test,
    }),
    [iface]
  )

  useEffect(() => {
    onChange(defaultAnswers)
    // eslint-disable-next-line
  }, [])

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
              value: "iou",
              text:
                "Answers should be close to the solution, measured by intersection over union",
            },
            iface.type.includes("segmentation") && {
              value: "classificationOnly",
              text: "Only label the classifications",
            },
          ].filter(Boolean),
        },
        {
          name: "iouErrorThreshold",
          title: "How much pixel IOU error is allowed?",
          type: "slider",
          visibleIf: '{method} == "iou"',
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
