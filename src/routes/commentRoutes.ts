import express from 'express';
import db from '../db';

const app = express.Router();

app.post('/create', async (req,res) => {
    try {
        const datas = await db.comment.create({
            data : {
             message : req.body.message,
             userId : req.body.user.id,
             postId : req.body.postId
            }
         });
 
        return res.status(201).send(datas);
    }catch(e){
        return res.status(400).json({e:e || 'Error during comment creation'})
    }
        
        
});

// get all comments about a unique post
app.get('/comments/:postId', async (req, res) => {
    try 
    {
        const postTargeted = await db.post.findUnique({
            where : {
                id:req.params.postId
            }
        })
        
        const comments = await db.comment.findMany({
            where : {
                postId : req.params.postId
            },
            include : {
                user : true
            }
        });

        const datas ={
            post : postTargeted,
            comments : comments
        }

        res.status(201).send(req.body.user);
    }catch(e){
        return res.status(400).json({e:e || 'Error during comment retrieve'})
    }
    
});


app.put('/:commentId', async (req, res) => {

    try {
        const userId = req.body.user.id;

        const commentTargeted = await db.comment.findUnique({
            where : {
                id: req.params.commentId
            }
        }); 
        const IdOwnerOfCommentTargeted = commentTargeted?.userId;

        if(IdOwnerOfCommentTargeted !== userId && req.body.user.role !=='ADMIN')
        {
            const datas = {
                error : "Ce commentaire ne vous appartient pas !"
            }

            return  res.status(201).send(datas);
        }

        const datas = await db.comment.update({
            where : {
            id: req.params.commentId
            },
            data : {
                message : req.body.message
            }
        });

        res.status(201).send(datas);
    }catch(e){
        return res.status(400).json({e:e || 'Error during update comment'})
    }
    
});

app.delete('/:commentId', async (req, res) => {

    try{
        const userId = req.body.user.id;

        const commentTargeted = await db.comment.findUnique({
            where : {
                id: req.params.commentId
            }
        }); 
        const IdOwnerOfCommentTargeted = commentTargeted?.userId;

        if(IdOwnerOfCommentTargeted !== userId && req.body.user.role !=='ADMIN')
        {
            const datas = {
                error : "Vous n'etes pas autorisé à supprimer ce commentaire !"
            }
            return res.status(201).send(datas);

            
        }
        
        await  db.comment.delete({
            where: {
            id : req.params.commentId
            },
        })

        res.status(201).send({
            message : req.body.user
        });
    }catch(e){
        return res.status(400).json({e:e || 'Error duringdeletion'})
    }
});

module.exports = app;