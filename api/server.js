const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const  session =require('express-session')

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const sessionConfig = {
    name: 'monkey',
    secret: 'secret',
    cookie : {
        maxAge: 1000 *60 * 60 * 24,
        secure : false, //true on prod
        httpOnly: false
    },
    resave: false,
    saveUninitialized:false //gdpr laws agains setting cookie auto
}

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(session(sessionConfig))

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
