const server = require('./server')
const supertest = require('supertest')

const request = supertest(server)

describe('server  module', ()=>{
    describe('server use', ()=>{
        it('Gets the login endpoint', async done => {
            // Sends GET Request to /test endpoint
            const response = await request.get('/api/auth/login')
            expect(response.status).toBe(200)
            done()
          })

          it('posts to the login endpoint', async done => {
            // Sends GET Request to /test endpoint
            const body = {"username":'toto',  "password":'123'}
            const response = await request.post('/api/auth/login')
            .send(body)
            .then(res => expect(res))
            expect(response)
            // expect(response.body.message).toBe('pass!')
            // ...
            done()
          })
    })
})