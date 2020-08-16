// @flow

import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import exampleDataset from "../Course/example-course.udt.json"

import CourseEditor from "./"

const Template = (args) => <CourseEditor {...args} />

export const Primary = Template.bind({})
Primary.args = { dataset: exampleDataset }

export default {
  title: "CourseEditor",
  component: Primary,
  argTypes: {},
}
