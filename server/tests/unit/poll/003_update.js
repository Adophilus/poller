module.exports = (config, server, chai) => {
	it('should update a poll', function (done) {
		chai.request(global.server)
			.get('/poll')
			.end((err, res) => {
				if (err) {
					console.log(err)
					done()
				} else {
					chai.assert.typeOf(res.body, 'Array')
					chai.request(global.server)
						.put('/poll/' + res.body[0].id)
						.send({
							question: 'How can I display the date in UTC format in JavaScript?',
							options: [
								{
									type: 'radio',
									label: 'new Date()',
									value: 'a',
									group: '0'
								},
								{
									type: 'radio',
									label: 'new Date().toUTCString()',
									value: 'b',
									group: '0'
								},
								{
									type: 'radio',
									label: 'console.log(new Date.toUTCString())',
									value: 'c',
									group: '0'
								},
								{
									type: 'radio',
									label: 'console.log(new Date().toUTCString())',
									value: 'd',
									group: '0'
								}
							]
						})
						.end((err, res) => {
							if (err) {
								console.log(err)
								done()
							} else {
								chai.assert.strictEqual(res.status, 200)
								chai.assert.strictEqual(res.body.message, config.message.success.POLL_UPDATED)
								done()
							}
						})
				}
			})
	})
}
