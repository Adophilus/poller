const mongoose = require('mongoose')
const Joi = require("joi")

const schema = Joi.object({
	question: Joi.string().required(),
	options: Joi.array().required().items(Joi.object().keys({
		type: Joi.string().required(),
		label: Joi.string().required(),
		value: Joi.string().required(),
		group: Joi.string(),
		match: Joi.string(),
		placeholder: Joi.string()
	}).custom((obj, helper) => {
		switch (obj.type) {
			case 'input':
				if (!obj.placeholder) {
					throw new Error(config.message.error.PLACEHOLDER_UNSPECIFIED)
				}
				else if (!obj.match) {
					throw new Error(config.message.error.MATCH_UNSPECIFIED)
				}
				break
			case 'radio':
				if (!obj.group) {
					throw new Error(config.message.error.GROUP_UNSPECIFIED)
				}
				break
			case 'select':
				if (!obj.options) {
					throw new Error(config.message.error.OPTIONS_UNSPECIFIED)
				}
				for (let option of obj.options) {
					if (!option.label) {
						throw new Error(config.message.error.LABEL_UNSPECIFIED)
					}
					else if (!option.value) {
						throw new Error(config.message.error.VALUE_UNSPECIFIED)
					}
				}
				break
			default:
				throw new Error(config.message.error.INVALID_OPTION_TYPE)
		}

		return obj
	}))
})

const modelSchema = new mongoose.Schema({
	question: {
		type: String,
		required: true
	},
	options: {
		type: Array,
		required: true
	}
})

modelSchema.methods.json = function () {
	const obj = this.toObject()
	return {
		id: obj._id.toString(),
		question: obj.question,
		options: obj.options
	}
}

module.exports = {
	Poll: mongoose.model('Poll', modelSchema),
	schema: schema
}
