const express = require('express');
const {createJWT} = require('../modules/auth')

const app = express.Router();

app.post('/createUser', (req,res) => {
    console.log(req.body.user)

    res.status(201).send({
        message : req.body.user
    })
});

app.delete('/:id',(req,res) => {
    
})

module.exports = app;