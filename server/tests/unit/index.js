const fs = require('fs')

module.exports = (config, server, chai) => {
  describe('Unit Tests', function () {
    fs.readdirSync(__dirname)
      .filter(file => file !== 'index.js')
      .forEach(file => require(`./${file}`)(config, server, chai))
  })
}
