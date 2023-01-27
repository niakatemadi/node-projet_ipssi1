import express from 'express';
import db from '../db';

const app = express.Router();

app.get('/:userId',async(req,res) => {
    try {
        const datas = await db.user.findUnique({
            where : {
                id: req.params.userId
            }
        })

        const userDatas = {
            name : datas?.name,
            role : datas?.role
        }
    
        res.status(201).send(userDatas);
    }catch(e){
        return res.status(400).json({e:e || 'Error during retrieve user datas'})
    }
})

app.put('/:userId',async(req,res) => {
    try{
        const userUpdated = await db.user.update({
            where : {
                id: req.params.userId
            },
            data : {
                name : req.body.username
            }
        })
    
        res.status(201).send('username updated !');
    }catch(e){
        return res.status(400).json({e:e || 'Error during update user data'})
    }
})

app.delete('/:userId',async(req,res) => {
    try{
        const datas = await db.user.delete({
            where : {
                id: req.params.userId
            }
        })

        const userDeleted = `user ${datas.name} deleted !`;
    
        res.status(201).send(userDeleted);
    }catch(e){
        return res.status(400).json({e:e || 'Error duringdeletion'})
    }
})

module.exports = app;