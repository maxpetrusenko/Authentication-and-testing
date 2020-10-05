const router = require('express').Router();
const db = require("../database/db")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secrets = require('../config/secret');
const  session = require('express-session')

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  db.insert(user)
  .then(rez=>{
      res.status(201).json(rez)
  })
  .catch(err =>{
      res.status(500).json(err)
  })
});

router.post('/login', (req, res) => {
  // implement login
  const {username, password} = req.body;
    db.get(username)
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)){
            const token = generateToken(user)
            req.session.user =  user;
            res.status(200).json({
                message: `Welcome ${user.username}!`,
                token
            })
        }
        else {
            return res.status(401).json({ error: 'Incorrect credentials' });
        }
    })
    .catch(err =>{
        res.json(err)
    })

});

router.get('/login', (req,res) =>{
    res.json('welcome to login endpoint')
})

function generateToken(user) {
  const payload = {
      subject: user.id, //sub prop
      username: user.username
      //...other data
  }

  const options = {
      expiresIn: '8h'
  }
  return jwt.sign(payload, secrets.jwtSecret,options)
}

module.exports = router;
