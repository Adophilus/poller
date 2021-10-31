module.exports = (config, server, chai) => {
	it('should create a poll', (done) => {
		chai.request(global.server)
			.post('/poll')
			.send({
				question: 'Should criminals be sentenced to death?',
				options: [
					{
						type: 'radio',
						group: '0',
						label: 'Yes',
						value: 'yes'
					},
					{
						type: 'radio',
						group: '0',
						label: 'No',
						value: 'no'
					},
					{
						type: 'radio',
						group: '0',
						label: 'It depends on the crime committed',
						value: 'depends'
					},
					{
						type: 'radio',
						group: '0',
						label: 'Maybe',
						value: 'maybe'
					}
				]
			})
			.end((err, res) => {
				if (err) {
					console.log(err)
					done()
				} else {
					chai.assert.strictEqual(res.status, 201)
					chai.assert.strictEqual(res.body.message, config.message.success.POLL_CREATED)
					done()
				}
			})
	})
}
