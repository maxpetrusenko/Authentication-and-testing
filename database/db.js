const db = require("./dbConfig")
const express = require('express')

module.exports = {
    get,
    insert,
    update,
    remove
}

function get(username) {
    let query = db('users')

    if(username){
        return query.where('username', username)
        .first()
        .then(user=>{
            return user})
        .catch(err=>{return err})
    }else{
        return query
    }
}

function insert(data) {
    return db('users')
    .insert(data, 'id')
    .then(ids => ({id:ids[0]}))
}

function update(changes, id) {
    return db('users')
    .where('id',Number(id))
    .update(car)
}

function remove(id) {
    return db('users')
    .where('id',Number(id))
    .del()
}