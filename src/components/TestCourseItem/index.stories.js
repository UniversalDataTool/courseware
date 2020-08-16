import React from "react"
import TestCourseItem from "./"

const Template = (args) => <TestCourseItem {...args} />

export const Test = Template.bind({})
Test.args = {
  test: {
    exercise: false,
    method: "exact",
  },
  dataset: {
    interface: {
      type: "image_classification",
      labels: ["chubby cat", "skinny cat", "baby cat"],
    },
    samples: [
      {
        imageUrl:
          "https://cdn.pixabay.com/photo/2012/11/26/13/58/cat-67345__480.jpg",
        annotation: "chubby cat",
      },
      {
        imageUrl:
          "https://cdn.pixabay.com/photo/2014/09/18/20/17/cat-451377__480.jpg",
        annotation: "baby cat",
      },
      {
        imageUrl:
          "https://cdn.pixabay.com/photo/2015/01/31/12/36/cat-618470__480.jpg",
        annotation: "skinny cat",
      },
      {
        imageUrl:
          "https://cdn.pixabay.com/photo/2014/07/24/18/40/cat-401124__480.jpg",
        annotation: "skinny cat",
      },
    ],
  },
}

export const Exercise = Template.bind({})
Exercise.args = {
  test: {
    exercise: true,
    method: "exact",
  },
  dataset: {
    interface: {
      type: "image_classification",
      labels: ["chubby cat", "skinny cat", "baby cat"],
    },
    samples: [
      {
        imageUrl:
          "https://cdn.pixabay.com/photo/2012/11/26/13/58/cat-67345__480.jpg",
        annotation: "chubby cat",
      },
      {
        imageUrl:
          "https://cdn.pixabay.com/photo/2014/09/18/20/17/cat-451377__480.jpg",
        annotation: "baby cat",
      },
      {
        imageUrl:
          "https://cdn.pixabay.com/photo/2015/01/31/12/36/cat-618470__480.jpg",
        annotation: "skinny cat",
      },
      {
        imageUrl:
          "https://cdn.pixabay.com/photo/2014/07/24/18/40/cat-401124__480.jpg",
        annotation: "skinny cat",
      },
    ],
  },
}

export default {
  title: "TestCourseItem",
  component: Test,
  argTypes: {},
}
