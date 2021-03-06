const getDB = require("../../../lib/database")
const { send, json } = require("micro")
const query = require("micro-query")
const cors = require("micro-cors")()

module.exports = cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    return send(res, 200)
  }
  const db = await getDB({ migrate: true })
  const { course_id } = { ...(req.query || {}), ...query(req) }

  switch (req.method) {
    case "GET": {
      const { authorization: userEditKey } = req.headers
      if (!userEditKey) {
        return send(res, 400, "edit_key (Authorization) is required")
      }
      const { edit_key: correctEditKey } = await db("course")
        .select("edit_key")
        .where({ course_id })
        .first()

      if (userEditKey !== correctEditKey) {
        return send(res, 403, "incorrect edit key")
      }

      return send(res, 200, {
        students: await db("course_completion")
          .where({ course_id })
          .orderBy("created_at", "DESC"),
      })
    }
    default:
      return send(res, 405)
  }
})
