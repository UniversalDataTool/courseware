const getDB = require("../../../lib/database")
const { send, json } = require("micro")
const query = require("micro-query")
const cors = require("micro-cors")()

module.exports = cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    return send(res, 200)
  }
  const db = await getDB({ migrate: true })
  const { course_id, email } = { ...(req.query || {}), ...query(req) }

  if (!course_id) return send(res, 400, "missing course_id")
  if (!email) return send(res, 400, "missing email")

  switch (req.method) {
    case "GET": {
      return send(res, 200, {
        hasCompletedCourse: Boolean(
          await db("course_completion")
            .where({ course_id, email })
            .select("course_completion_id")
        ),
      })
    }
    default:
      return send(res, 405)
  }
})
