const getDB = require("../lib/database")
const { send, json } = require("micro")

module.exports = async (req, res) => {
  const db = await getDB({ migrate: true })

  switch (req.method) {
    case "POST": {
      const { dataset } = await json(req)
      try {
        const [course_id] = await db("course")
          .insert({ dataset })
          .returning("course_id")
        const course = await db("course").where({ course_id }).first()
        return send(res, 200, course)
      } catch (e) {
        console.log(e.toString())
        return send(res, 500, e.toString())
      }
    }
    default:
      return send(res, 405)
  }
}
