import express from 'express';
import db from '../db';
const app = express.Router();

app.post('/', async (req, res) => {
    try
    {
        const userId = req.body.user.id;
        
        const datas = await db.post.create({
        data : {
            post : req.body.post,
            userId : userId
        }
        });

        res.status(201).send(datas);
    }catch(e){
        return res.status(400).json({e:e || 'Error during post creation'})
    }
    
});

app.put('/:postId', async (req, res) => {

    try {
        const userId = req.body.user.id;

        const postTargeted = await db.post.findUnique({
            where : {
                id: req.params.postId
            }
        }); 
        const IdOwnerOfPostTargeted = postTargeted?.userId;

        if(IdOwnerOfPostTargeted !== userId && req.body.user.role !=='ADMIN')
        {
            const datas = {
                error : "Ce post ne vous appartient pas !"
            }
           return res.status(201).send(datas);
        }

        const datas = await db.post.update({
            where : {
            id: req.params.postId
            },
            data : {
                post : req.body.post
            }
        });

        res.status(201).send(datas);
    }catch(e){
        return res.status(400).json({e:e || 'Error during post update'})
    }
    
});

app.delete('/:postId', async (req, res) => {

    try {
        const userId = req.body.user.id;

        const postTargeted = await db.post.findUnique({
            where : {
                id: req.params.postId
            }
        }); 
        const IdOwnerOfPostTargeted = postTargeted?.userId;

        if(IdOwnerOfPostTargeted !== userId && req.body.user.role !=='ADMIN')
        {
            const datas = {
                error : "Ce post ne vous appartient pas !"
            }
            return res.status(201).send(datas);
        }

        const deleteComments = db.comment.deleteMany({
            where: {
            postId : req.params.postId
            },
        })
        
        const deletePost = db.post.delete({
            where: {
            id : req.params.postId
            },
        })
        
        const transaction = await db.$transaction([deleteComments, deletePost])

        res.status(201).send(transaction);
    }catch(e){
        return res.status(400).json({e:e || 'Error during post delete'})
    }
    
})

app.get('/allPosts', async (req, res) => {
    try {
        const timestamp = req.query.from;

        if(typeof timestamp !== 'string')
        {
            return res.status(200).send({
                error : 'Timestamp dois etre de type number !'
            })
        }
        const Fromdate = new Date(parseInt(timestamp)*1000);
    
        const posts = await db.post.findMany({
            where : {
                createdAt : {
                    gt : Fromdate
                }
            }
        });

        res.status(201).send(posts);
    }catch(e){
        return res.status(400).json({e:e || 'Error all posts retrieve'})
    }
    
});

app.get('/allPosts/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
    
    const datas = await db.post.findMany({
        where : {
            userId : userId
        }
    });

    res.status(201).send(datas);
    }catch(e){
        return res.status(400).json({e:e || 'Error during get of posts of a single user'})
    }
    
});

module.exports = app;