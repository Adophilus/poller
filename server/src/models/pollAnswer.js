const mongoose = require('mongoose')
const Joi = require("joi")

const schema = Joi.object({
	dateCreated: Joi.date(),
	pollId: Joi.string().required(),
	user: Joi.string().required(),
	answers: Joi.array().items(Joi.object({
		id: Joi.number().required(),
		value: Joi.string()
	}))
})

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
