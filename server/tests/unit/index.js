const config = require('../../src/config/config')
const chai = require('chai')
chai.use(require('chai-http'))

module.exports = (app) => {
  describe('Unit Tests (Poll)', function () {
    before(async () => {
      global.server = await app()
    })

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
  })
}
