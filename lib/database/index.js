module.exports = require("pgknexlove")({
  migrationFile: require.resolve("./schema.sql"),
})
