module.exports = (config, server, chai) => {
	it('should vote in a poll', function (done) {
		chai.request(global.server)
			.get('/poll')
			.end((err, res) => {
				if (err) {
					console.log(err)
				} else {
					chai.assert.typeOf(res.body, 'Array')
					chai.assert.notStrictEqual(res.body.length, 0)
					chai.request(global.server)
						.post('/poll/' + res.body[0].id)
						.send([
							{
								id: '1',
								value: 'd'
							}
						])
						.end((err, res) => {
							chai.assert.strictEqual(res.body.message, config.message.success.VOTE_CASTED)
							chai.assert.strictEqual(res.status, 201)
							done()
						})
				}
			})
	})
}
