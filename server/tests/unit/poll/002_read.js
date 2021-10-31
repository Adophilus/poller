module.exports = (config, server, chai) => {
	it('should retrieve poll (s)', function (done) {
		chai.request(global.server)
			.get('/poll')
			.end((err, res) => {
				if (err) {
					console.log(err)
					done()
				} else {
					chai.assert.typeOf(res.body, 'Array')
					chai.assert.notStrictEqual(res.body.length, 0)
					chai.request(global.server)
						.get('/poll/' + res.body[0].id)
						.end((err, res) => {
							if (err) {
								console.log(err)
								done()
							} else {
								chai.assert.typeOf(res.body, 'Object')
								done()
							}
						})
				}
			})
	})
}
