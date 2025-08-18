const fs = require('fs');
const Post = require('../models/post.model');
const { error } = require('console');

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

            post.title = title;
            post.summary = summary;
            post.content = content;
            post.cover = newCoverPath ? newCoverPath : post.cover;
            
            await post.save();
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
        const post = await Post.findById()
        .populate('author', ['username']);
        if(!post) return res.status(404).json({error:'Post not found'});
        return res.json(post);
    }catch(err){
        next(err);
    }
};
