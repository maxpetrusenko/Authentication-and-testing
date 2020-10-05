const e = require('express');
const jwt = require('jsonwebtoken')
const secrets = require("../config/secret")

module.exports = (req, res , next ) =>{
    const  token = req.headers.authorization;
    if(token){
        jwt.verify(token, secrets.jwtSecret , (err,decodedToken) =>{
            if(err){
                res.status(401).json(err)
            }else{
                req.decodedToken = decodedToken;
                next();
            }
        })
    }else{
        res.status(400).json({message:'Error retrieving token'})
    }

}