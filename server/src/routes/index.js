const fs = require("fs")

fs.readdirSync("./").forEach((file) => require(`./${file}`)(app))
