
const server = require('../api/server')

const request = require('supertest')

describe('auth  module', ()=>{
    it('register endpoint trows error without  body', () => {
        // Sends GET Request to /test endpoint
        return request(server).get('/api/auth/register')
        .then(res =>expect(res.status).toBe(404))

      })

      it('posts to the register endpoint  returning  id', () => {
        const body = {"username":'totoz',  "password":'123'}
        return request(server).post('/api/auth/register')
        .send(body)
        .then(res => expect(res.id))
      })
})