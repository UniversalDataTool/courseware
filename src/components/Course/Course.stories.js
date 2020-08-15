import React from "react"
import Course from "./"
import exampleCourseUDT from "./example-course.udt.json"

const Template = (args) => <Course {...args} />

export const Primary = Template.bind({})
Primary.args = { dataset: exampleCourseUDT }

export default {
  title: "Course",
  component: Primary,
  argTypes: {},
}
