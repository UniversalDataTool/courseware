const getDB = require("../../../lib/database")
const { send, json } = require("micro")
const query = require("micro-query")

module.exports = async (req, res) => {
  const db = await getDB({ migrate: true })
  const { course_id } = { ...(req.query || {}), ...query(req) }

  switch (req.method) {
    case "POST": {
      const { contact_info } = await json(req)
      try {
        await db("course_completion").insert({
          contact_info,
          course_id,
          email: contact_info.email,
        })
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
