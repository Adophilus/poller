const config = require('../config/config')
const { PollMatch } = require('../models/PollMatch.js')

module.exports = {
  retrieveAll (req, res) {
    Poll.find()
      .then(docs => res.status(200).send(docs.map(doc => doc.json())))
      .catch(err => {
        console.log(err)
        res.status(500).send({ error: config.message.status_code['500'] })
      })
  }
}
