const calendar = require('node-calendar')
const mongoose = require('mongoose')
const Joi = require("joi")

calendar.setlocale("en_US")

const schema = Joi.object({
	name: Joi.string().required(),
	pattern: Joi.array().items(Joi.string()).required(),
	errorMessage: Joi.string()
})

const modelSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	pattern: {
		type: Array,
		required: true
	},
	errorMessage: {
		type: String,
		required: true
	}
})

modelSchema.methods.json = function () {
	const obj = this.toObject()
	return {
		id: obj._id.toString(),
		name: obj.name,
		pattern: obj.pattern,
		errorMessage: obj.errorMessage
	}
}

const model = mongoose.model('PollMatch', modelSchema)

module.exports = {
	PollMatch: model,
	schema: schema,
	setup: () => {
		model.deleteMany()

		new model({
			name: "Numbers only",
			pattern: [/^d+$/]
		})
			.save()
		new model({
			name: "Letters only",
			pattern: [/^w+$]
		})
			.save()
		new model({
			name: "Alphanumerics only",
			pattern: [/^(d|w)+$/]
		})
			.save()
		new model({
			name: "Day of the week",
			pattern: calendar.day_name
		})
			.save()
		new model({
			name: "Email address",
			pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
		})
			.save()
	}
}
