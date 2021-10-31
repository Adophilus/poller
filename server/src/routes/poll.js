const PollController = require('../controllers/PollController.js')
const PollControllerPolicy = require('../policies/PollControllerPolicy.js')

module.exports = (app) => {
  app.post('/poll', PollControllerPolicy.create, PollController.create)
  app.get('/poll', PollController.retrieveAll)
  app.get('/poll/:poll_id', PollControllerPolicy.retrieve, PollController.retrieve)
  app.put('/poll/:poll_id', PollControllerPolicy.update, PollController.update)
  app.delete('/poll/:poll_id', PollControllerPolicy.remove, PollController.remove)

  app.post('/poll/:poll_id', PollControllerPolicy.retrieve, PollController.vote)
}
