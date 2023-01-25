const express = require('express');

const app = express.Router();

app.post('/', (req,res) => {
    console.log(req.body.name)

    res.status(201).send({
        message : req.body.name
    })
});

module.exports = app;