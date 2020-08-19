// @flow

import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import exampleDataset from "../Course/example-course.udt.json"

import CourseEditor from "./"

const Template = (args) => <CourseEditor {...args} />

export const Primary = Template.bind({})
Primary.args = { dataset: exampleDataset }

export const CourseWithImageSegmentation = Template.bind({})
CourseWithImageSegmentation.args = {
  onChangeDataset: action("onChangeDataset"),
  dataset: {
    interface: {
      type: "image_segmentation",
      labels: ["nose", "ear"],
    },
    samples: [],
    training: {
      title: "Image Segmentation Course",
      sections: [
        {
          name: "Introduction",
          items: [
            {
              test: {},
              dataset: {
                interface: {
                  type: "image_segmentation",
                  labels: ["nose", "ear"],
                },
                samples: [
                  {
                    imageUrl:
                      "https://cdn.pixabay.com/photo/2017/06/12/19/02/cat-2396473__480.jpg",
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  },
}

export default {
  title: "CourseEditor",
  component: Primary,
  argTypes: {},
}
