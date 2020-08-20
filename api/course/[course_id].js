const getDB = require("../../lib/database")
const { send, json } = require("micro")
const query = require("micro-query")

module.exports = async (req, res) => {
  const db = await getDB()
  const { course_id, download } = { ...(req.query || {}), ...query(req) }

  if (!course_id) {
    return send(res, 400, "course_id is required")
  }

  const course = await db("course")
    .select(["created_at", "course_num", "course_id", "dataset"])
    .where({ course_id })
    .first()

  if (!course) return send(res, 404)

  switch (req.method) {
    case "GET": {
      if (download) {
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${
            (course.dataset.training || {}).title || "course"
          }.udt.json"`
        )
        return send(res, 200, course.dataset)
      }
      return send(res, 200, course)
    }
    case "PUT": {
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

      try {
        const { dataset } = await json(req)
        await db("course").where({ course_id }).update({ dataset })
        return send(res, 200)
      } catch (e) {
        console.log(e.toString())
        return send(res, 500, e.toString())
      }
    }
    default:
      return send(res, 405)
  }
}
