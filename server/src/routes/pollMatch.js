const PollMatchController = require("../controllers/PollmatchController.js")

module.exports = (app) => {
  app.get('/poll/match', PollMatchController.retrieveAll)
}
