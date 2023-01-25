const express = require('express');
const db = require('../db');
const app = express.Router();

app.post('/create', async (req,res) => {

   // const userId = req.body.user.id;
    
    const datas = await db.

    res.status(201).send({datas});
});

module.exports = app;