const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync();
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/email.util.js'); 
const crypto = require('crypto');


exports.register = async(req, res,next) =>{
    try{
        const {name, username, email, password} = req.body;
       if (!username || !password || !name || !email) {
            return res.status(400).json({ error: 'All fields (name, username, email, password) are required' });
        }
        const existing = await User.findOne({ $or: [{ username }, { email }] });
        if (existing) {
            return res.status(409).json({ error: 'Username or email already taken' });
        }
        const passwordHash = await bcrypt.hash(password, salt);
        const user = await User.create({ name, username, email, password: passwordHash });
        return res.status(201).json(user);
    }catch (err){
        next(err);
    }
};

exports.login = async(req, res, next) =>{
    try{
        const { identifier, password } = req.body;
        const user = await User.findOne({
            $or: [
                { username: identifier },
                { email: identifier.toLowerCase() }
            ]
        });        
               if (!user) {
            return res.status(401).json({ error: 'Invalid Credentials' });
        }

        const passOk = await bcrypt.compare(password, user.password);
        if (!passOk) {
            return res.status(401).json({ error: 'Invalid Credentials' });
        }
        const token = jwt.sign({ id: user.id, name: user.name, username: user.username }, process.env.JWT_SECRET, { expiresIn: '2d' });
        res.cookie('token', token, {httpOnly:true, secure:false, sameSite:"lax"}).json(user);
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

exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            // Por segurança, não revele que o e-mail não foi encontrado.
            return res.status(200).json({ message: 'If an account with that email exists, a reset link has been sent.' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpires = Date.now() + 3600000; // Expira em 1 hora
        
        await user.save();

        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
        const message = `You requested a password reset. Please click this link to create a new password:\n\n${resetUrl}`;

        await sendEmail({
            to: user.email,
            subject: 'Password Reset Request',
            text: message,
        });
        
        res.status(200).json({ message: 'Password reset link sent to your email' });

    } catch (err) {
        // Se ocorrer um erro, limpamos o token para evitar inconsistências
        if (req.user) {
            req.user.resetPasswordToken = undefined;
            req.user.resetPasswordExpires = undefined;
            await req.user.save({ validateBeforeSave: false });
        }
        next(err);
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: 'Token is invalid or has expired' });
        }

        user.password = await bcrypt.hash(req.body.password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({ message: 'Password has been reset successfully.' });

    } catch (err) {
        next(err);
    }
};
