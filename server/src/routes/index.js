const fs = require('fs')

module.exports = (app) => {
  fs.readdirSync(__dirname)
    .filter(file => file !== 'index.js')
    .forEach(file => require(`./${file}`)(app))
}
