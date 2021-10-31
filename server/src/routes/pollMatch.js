const PollMatchController = require('../controllers/PollMatchController.js')

module.exports = (app) => {
  app.get('/poll/match', PollMatchController.retrieveAll)
}
