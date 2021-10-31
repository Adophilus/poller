module.exports = (config, server, chai) => {
	it('should delete polls', function (done) {
		chai.request(global.server)
			.get('/poll')
			.end((err, res) => {
				if (err) {
					console.log(err)
					done()
				} else {
					chai.assert.typeOf(res.body, 'Array')

					for (let i = 0; i < res.body.length; i++) {
						const poll = res.body[i]
						chai.request(global.server)
							.delete('/poll/' + poll.id)
							.end((err, r) => {
								if (err) { console.log(err) } else {
									chai.assert.strictEqual(r.status, 200)
									if (i == (res.body.length - 1)) {
										done()
										console.log('all done')
									}
								}
							})
					}
				}
			})
	})
}
