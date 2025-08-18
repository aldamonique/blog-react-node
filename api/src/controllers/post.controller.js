const fs = require('fs');
const Post = require('../models/post.model');
const { error } = require('console');
const jwt = require('jsonwebtoken');


exports.createPost = async (req,res, next) =>{
    try{
        let coverPath = null;
        if(req.file){
            const {originalname, path} = req.file;
            const ext = originalname.split('.').pop();
            coverPath = `${path}.${ext}`;
            fs.renameSync(path, coverPath);
        }
        const {token} = req.cookies;
        if (!token) return res.status(401).json({error:'Unauthorized'});

        jwt.verify(token, process.env.JWT_SECRET, {}, async (err,info) =>{
            if (err) return res.status(401).json({error: 'Invalid Token'});

            const {title, summary, content} = req.body;

            const post = await Post.create({
                title, 
                summary, 
                content, 
                cover:coverPath,
                author:info.id,
            });
            return res.status(201).json(post);

        });
        
    }catch(err){
        next(err);
    }
};
exports.updatePost = async (req, res, next) =>{
    try{
        let newCoverPath = null;

        if(req.file){
            const{originalname, path} = req.file;
            const ext = originalname.split('.').pop();
            newCoverPath = `${path}.${ext}`;
            fs.rebameSync(path, newCoverPath);
        }

        const {token} = req.cookies;
        if (!token) return res.status(401).json({error:'Unauthorized'});

        jwt.verify(token, process.env.JWT_SECRET, {}, async (err,info) =>{
            if (err) return res.status(401).json({error: 'Invalid Token'});

            const {id} = req.params;
            const {title, summary, content} = req.body;

            const post = await Post.findById(id);
            if(!post) return res.status(404).json({error: 'Post not found'});
            const isAuthor = post.author.toString() === info.id;

            if(!isAuthor) return res.status(403).json({error: 'Not authorized to edit this post'});

            if (req.body.title) post.title = title;
            if (req.body.summary) post.summary = summary;
            if (req.body.content) post.content = content;
            if (req.body.cover) post.cover = newCoverPath ? newCoverPath : post.cover;
            
            await post.save();
            await post.populate('author', 'username name');

            return res.json(post);

        });

    }catch(err){
        next(err);
    }
};


exports.getPosts = async (req, res, next) =>{
    try{
        const posts = await Post.find()
        .populate('author', ['username'])
        .sort({createdAt:-1}) //order by desc
        .limit(20);
        return res.json(posts);

    }catch(err){
        next(err);
    }
};

exports.getPostsById = async (req, res, next) =>{
    try{
        const {id} = req.params;
        const post = await Post.findById(id)
        .populate('author', ['username']);
        if(!post) return res.status(404).json({error:'Post not found'});
        return res.json(post);
    }catch(err){
        next(err);
    }
};
