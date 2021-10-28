const config = require('../config/config')
const { Poll } = require('../models/poll')
const { PollAnswer } = require('../models/pollAnswer')

module.exports = {
  create (req, res) {
    new Poll(res.locals.poll)
      .save()
      .then(doc => {
        res.status(201).send({ message: config.message.success.POLL_CREATED })
      })
      .catch(err => {
        console.log(err)
        res.status(500).send({ error: config.message.status_code['500'] })
      })
  },
  retrieve (req, res, next) {
    res.status(200).send(res.locals.poll.json())
  },
  retrieveAll (req, res) {
    Poll.find()
      .then(docs => res.status(200).send(docs.map(doc => doc.json())))
      .catch(err => {
        console.log(err)
        res.status(500).send({ error: config.message.status_code['500'] })
      })
  },
  update (req, res) {
    Poll.findOneAndUpdate({
      _id: req.params.poll_id
    },
    res.locals.poll)
      .then(docs => {
        res.status(200).send({ message: config.message.success.POLL_UPDATED })
      })
      .catch(err => {
        console.log(err)
        res.status(500).send({ error: config.message.status_code['500'] })
      })
  },
  remove (req, res, next) {
    Poll.findOneAndRemove({
      _id: req.params.poll_id
    })
      .then(docs => res.status(200).send({ message: config.message.success.POLL_DELETED }))
      .catch(err => {
        console.log(err)
        res.status(500).send({ error: config.message.status_code['500'] })
      })
  },
  vote (req, res, next) {
    const answers = req.body // perform validation checks later
    new PollAnswer({
      dateCreated: new Date(),
      pollId: res.locals.poll._id,
      user: 'testUser',
      answers: answers
    })
      .save()
      .then(docs => {
        res.status(201)
          .send({ message: config.message.success.VOTE_CASTED })
      })
      .catch(err => {
        console.log(err)
        res.status(500)
          .send({ error: config.message.status_code['500'] })
      })
  }
}
