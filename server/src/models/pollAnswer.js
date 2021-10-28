const mongoose = require('mongoose')
const Joi = require("joi")

const schema = Joi.object()

const modelSchema = new mongoose.Schema({
  dateCreated: {
    type: Date,
    required: true
  },
  pollId: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  answers: {
    type: Array,
    required: true
  }
})

module.exports = {
	PollAnswer: mongoose.model('PollAnswer', modelSchema),
	schema: schema
}


