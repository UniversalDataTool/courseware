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
              test: {
                exercise: true,
                method: "iou",
                iouErrorThreshold: 0.2,
              },
              dataset: {
                interface: {
                  type: "image_segmentation",
                  labels: ["nose", "ear"],
                },
                samples: [
                  {
                    imageUrl:
                      "https://cdn.pixabay.com/photo/2017/06/12/19/02/cat-2396473__480.jpg",
                    annotation: [
                      {
                        regionType: "bounding-box",
                        id: "4658369741774937",
                        centerX: 0.5153557829457364,
                        centerY: 0.45634729069767443,
                        width: 0.05131113178294572,
                        height: 0.10754195348837213,
                        classification: "ear",
                        color: "#2196f3",
                      },
                    ],
                    allowedArea: {
                      x: 0.36269246511627895,
                      y: 0.3575218023255814,
                      width: 0.2062997829457366,
                      height: 0.17906976744186043,
                    },
                  },
                ],
              },
              id: "htoq",
            },
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
