const getDB = require("../lib/database")
const test = require("ava")
const micro = require("micro")
const listen = require("test-listen")
const request = require("request-promise")
const createCourseEndpoint = require("../api/course.js")
const getCourseEndpoint = require("../api/course/[course_id].js")

test("should be able to create, update and retrieve course", async (t) => {
  const db = await getDB({ migrate: true, testMode: true })
  await db.raw("SELECT 1+1")
  const createUrl = await listen(micro(createCourseEndpoint))
  const res1 = await request(createUrl, {
    method: "POST",
    body: { dataset: {} },
    json: true,
  })

  t.assert(res1.course_id)
  t.assert(res1.edit_key)
  t.assert((await db("course")).length === 1)

  const getUrl = await listen(micro(getCourseEndpoint))
  const res2 = JSON.parse(
    await request(getUrl + `?course_id=${res1.course_id}`)
  )
  t.assert(res2.dataset)

  await request(getUrl + `?course_id=${res1.course_id}`, {
    method: "PUT",
    body: JSON.stringify({ dataset: { edited: true } }),
    headers: { Authorization: res1.edit_key },
  })

  const course = await db("course").where({ course_id: res1.course_id }).first()

  t.assert(course.dataset.edited)

  await db.destroy()
})
