import React, { Fragment } from "react"
import SampleGrid from "universal-data-tool/components/SampleGrid"
import isEqual from "lodash/isEqual"

import { styled, Box, Button, colors, Typography } from "@material-ui/core"

const Section = styled(Typography)({
  marginTop: 24,
  marginBottom: 8,
})
const Sample = styled(Button)({
  backgroundColor: colors.green[500],
  color: "#fff",
  borderRadius: 4,
  width: 80,
  margin: 8,
  border: `1px solid ${colors.green[600]}`,
  "&:hover": {
    border: `1px solid ${colors.red[600]}`,
    backgroundColor: colors.red[500],
  },
})

export const SelectSamplesFromDataset = ({ dataset, selection, onChange }) => {
  return (
    <Fragment>
      <Section>Added Samples</Section>
      <Box>
        {selection.map(({ originalIndex }, i) => (
          <Sample
            key={`${originalIndex} ${i}`}
            onClick={() => {
              onChange([...selection.slice(0, i), ...selection.slice(i + 1)])
            }}
          >
            #{i + 1}
            {originalIndex !== undefined ? ` [${originalIndex}]` : ""}
          </Sample>
        ))}
      </Box>
      <Section>Dataset Samples</Section>
      <Box height={400}>
        <SampleGrid
          onClick={(sampleIndex) => {
            onChange(
              selection.concat([
                { ...dataset.samples[sampleIndex], originalIndex: sampleIndex },
              ])
            )
          }}
          count={dataset.samples.length}
          samples={dataset.samples}
          completed={dataset.samples.map((a) => Boolean(a.annotation))}
        />
      </Box>
    </Fragment>
  )
}

export default SelectSamplesFromDataset
