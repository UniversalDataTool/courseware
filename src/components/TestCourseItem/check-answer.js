import isEqual from "lodash/isEqual"

export default (test, solution, answer) => {
  if (
    (test.method === undefined || test.method === "exact") &&
    !isEqual(solution, answer)
  ) {
    return "The answer does not match the instructor's solution."
  }
  return null
}
