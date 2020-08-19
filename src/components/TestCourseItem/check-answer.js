import isEqual from "lodash/isEqual"
import getIOU from "udt-iou-error"

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
  } else if (test.method === "iou") {
    const iouError = 1 - getIOU(solution, answer)
    if (iouError > (test.iouErrorThreshold || 0.1)) {
      return `The pixels you classified are ${(iouError * 100).toFixed(
        1
      )}% different than the instructors (only ${(100 - iouError * 100).toFixed(
        1
      )}% was perfectly overlapping). You need  ${(
        100 -
        test.iouErrorThreshold * 100
      ).toFixed(0)}%+ to perfectly overlap to pass.`
    }
  }
  return null
}
