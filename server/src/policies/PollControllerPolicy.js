const config = require('../config/config')
const { schema, Poll } = require('../models/poll')

module.exports = {
  create (req, res, next) {
    const { error } = schema.validate(req.body)

    if (error) {
      return res.status(400)
        .send({
          error: error
        })
    }

    let i = 0
    res.locals.poll = {
      creator: 'testUser',
      question: req.body.question,
      options: req.body.options.map(option => {
        option.id = ++i
        return option
      })
    }

    return next()
  },
  retrieve (req, res, next) {
    if (req.params.poll_id) {
      Poll.find({
        _id: req.params.poll_id
      })
        .limit(1)
        .exec()
        .then(docs => {
          if (docs.length > 0) {
            res.locals.poll = docs[0]
            return next()
          }

          res.status(404)
            .send({ error: config.message.status_code['404'] })
        })
        .catch(err => {
          console.log(err)
          res.status(500).send({ error: config.message.status_code['500'] })
        })
    } else {
      return res.status(400).send({ error: config.message.error.INVALID_PAYLOAD })
    }
  },
  update (req, res, next) {
    if (req.params.poll_id) {
      const { error } = schema.validate(req.body)

      if (error) {
        return res.status(400)
          .send({
            error: error
          })
      }

      res.locals.poll = {
        creator: 'testUser',
        question: req.body.question,
        options: req.body.options
      }

      return next()
    }

    return res.status(400)
      .send({
        error: config.message.error.INVALID_PAYLOAD
      })
  },
  remove (req, res, next) {
    if (req.params.poll_id) {
      return next()
    }

    return res.status(400)
      .send({
        error: config.message.error.INVALID_PAYLOAD
      })
  }
}
