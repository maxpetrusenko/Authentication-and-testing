//const jokes = require('./jokes-router')
const server = require('../api/server')
//const supertest = require('supertest')

const request = require('supertest')

describe('jokes  module', ()=>{
    it('Givs error', () => {
                const body = {"message":"Error retrieving token"}
                return request(server).get('/api/jokes')
                .then(rez => {
                    expect(rez.body).toEqual(body)
                })
    }),
    it('Givs error message', () => {
        const status = 400
        return request(server).get('/api/jokes')
        .then(rez => {
            expect(rez.status).toEqual(status)
        })
})
})