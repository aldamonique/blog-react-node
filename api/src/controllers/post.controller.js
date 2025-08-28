const fs = require('fs');
const Post = require('../models/post.model');
const { error } = require('console');
const jwt = require('jsonwebtoken');

exports.createPost = async (req, res, next) => {
    try {
        let coverPath = null;
        if (req.file) {
            const { originalname, path } = req.file;
            const ext = originalname.split('.').pop();
            coverPath = `${path}.${ext}`;
            fs.renameSync(path, coverPath);
        }

        const { id: authorId } = req.user;
        const { title, summary, content } = req.body;

        let post = await Post.create({
            title,
            summary,
            content,
            cover: coverPath,
            author: authorId,
        });

        post = await post.populate('author', 'name username'); 

        return res.status(201).json(post);
    } catch (err) {
        next(err);
    }
};
exports.updatePost = async (req, res, next) => {
    try {
        let newCoverPath = null;
        if (req.file) {
            const { originalname, path } = req.file;
            const ext = originalname.split('.').pop();
            newCoverPath = `${path}.${ext}`;
            fs.renameSync(path, newCoverPath);
        }

        const { id: postId } = req.params;
        const { title, summary, content } = req.body;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const isAuthor = post.author.toString() === req.user.id;
        if (!isAuthor) {
            return res.status(403).json({ error: 'Not authorized to edit this post' });
        }
        
        post.title = title;
        post.summary = summary;
        post.content = content;
        
         if (newCoverPath) {
            post.cover = newCoverPath;
        }
        
        await post.save();
        await post.populate('author', 'username name');
        return res.json(post);

    } catch(err) {
        next(err);
    }
};

exports.getPosts = async (req, res, next) =>{
    try{
        const posts = await Post.find()
        .populate('author', ['username',  'name'])
        .sort({createdAt:-1}) 
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
        .populate('author', 'username name');
        if(!post) return res.status(404).json({error:'Post not found'});
        return res.json(post);
    }catch(err){
        next(err);
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (post.author.toString() !== userId) {
            return res.status(403).json({ error: 'Forbidden: You are not the author of this post' });
        }

        await Post.findByIdAndDelete(postId);

        res.status(200).json({ message: 'Post deleted successfully' });

    } catch (err) {
        next(err);
    }
};

exports.getMyPosts = async (req, res, next) => {
  try {
    const userId = req.user.id; 

    const posts = await Post.find({ author: userId })
      .populate('author', ['username', 'name'])
      .sort({ createdAt: -1 });

    return res.json(posts);
  } catch(err){
    next(err);
  }
};