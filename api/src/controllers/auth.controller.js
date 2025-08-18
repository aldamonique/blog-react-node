const req = require('express/lib/request');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync();
const jwt = require('jsonwebtoken');


exports.register = async(req, res,next) =>{
    try{
        const {username, password} = req.body;
        if (!username || !password){
            return res.status(400).json({error: 'Username and password required'});
        }
        const existing = await  User.findOne({username});
        if(existing){
            return res.status(409).json({error:'Username aleeady taken'});
        }
        const passwordHash = await bcrypt.hash(password, salt);
        const user = await User.create({username, password: passwordHash});
        return res.status(201).json({id:user._id, username:user.username});

    }catch (err){
        next(err);
    }
};

exports.login = async(req, res, next) =>{
    try{
        const{username, password} = req.body;
        const user = await User.findOne({username});
        if(!user) return res.status(401).json({error:'Invalid Credentials'});
        const passOk = await bcrypt.compare(password, user.passwordHash);
        if(!passOk) return res.status(401).json({error:'Invalid Credentials'});
        const token = jwt.sign({id:user.id, username:user.username}, process.env.JWT_SECRET, {expiresIn:'2d'});
        res.cookie('token', token, {httpOnly:true}).json(user);
    }catch(err){
        next(err);
    }
};

exports.profile = async (req, res) => {
    res.json(req.user);
};

exports.logout = (req,res) => {
    res.clearCookie('token').json({message:'Logged out'});
};

