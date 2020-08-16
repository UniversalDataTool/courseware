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

export const ClassificationOnlyExercise = Template.bind({})
ClassificationOnlyExercise.args = {
  test: {
    exercise: true,
    method: "classificationOnly",
  },
  dataset: {
    interface: {
      type: "image_segmentation",
      labels: ["ear", "nose"],
    },
    samples: [
      {
        imageUrl:
          "https://cdn.pixabay.com/photo/2017/06/12/19/02/cat-2396473__480.jpg",
        annotation: [
          {
            regionType: "polygon",
            color: "#ff0000",
            classification: "nose",
            points: [
              {
                x: 0.4932151146050096,
                y: 0.63308103522158,
              },
              {
                x: 0.51174871224149,
                y: 0.6356671186127169,
              },
              {
                x: 0.5208000041104689,
                y: 0.6427788479383431,
              },
              {
                x: 0.530066802928709,
                y: 0.6489207959922929,
              },
              {
                x: 0.534376941913937,
                y: 0.6450416709055878,
              },
              {
                x: 0.535454476660244,
                y: 0.6350205977649326,
              },
              {
                x: 0.536532011406551,
                y: 0.6088365034296724,
              },
              {
                x: 0.5380405600513809,
                y: 0.5981689094412332,
              },
              {
                x: 0.5352389697109826,
                y: 0.587824575876686,
              },
              {
                x: 0.5266186917405267,
                y: 0.5736011172254336,
              },
              {
                x: 0.5175673998715479,
                y: 0.5554985334874759,
              },
              {
                x: 0.5102401635966602,
                y: 0.5399820331406552,
              },
              {
                x: 0.5003268439306359,
                y: 0.5186468451637765,
              },
              {
                x: 0.49881829528580607,
                y: 0.5176770638921002,
              },
              {
                x: 0.455716905433526,
                y: 0.5664893878998074,
              },
              {
                x: 0.46864732238921,
                y: 0.578126763159923,
              },
              {
                x: 0.4798536837508028,
                y: 0.6014015136801542,
              },
              {
                x: 0.4895514964675658,
                y: 0.6198273578420039,
              },
            ],
          },
        ],
      },
    ],
  },
}

export default {
  title: "TestCourseItem",
  component: Test,
  argTypes: {},
}
