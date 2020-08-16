import isEqual from "lodash/isEqual"

export default (test, solution, answer) => {
  if (
    (test.method === undefined || test.method === "exact") &&
    !isEqual(solution, answer)
  ) {
    return "The answer does not match the instructor's solution."
  } else if (
    test.method === "classificationOnly" &&
    !isEqual(
      solution.map((a) => a.classification),
      answer.map((a) => a.classification)
    )
  ) {
    return "The classifications on your shapes did not match the instructor's solution."
  }
  return null
}
