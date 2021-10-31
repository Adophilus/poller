const app = require("../app")
const config = require('../src/config/config')
const chai = require('chai')
const fs = require("fs")

chai.use(require('chai-http'))

describe('BDD Tests', function () {
	before(async () => {
		global.server = await app()
	})

	require('./unit')(config, global.server, chai)
})
