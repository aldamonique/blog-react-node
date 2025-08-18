const jwt = require('jsonwebtoken');

module.exports = (req, res,next) =>{
    const {token} = req.cookies;
    if (!token) return res.status(401).json({error:'No token, acess denied'});

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
        if(err) return res.status(403).json({error: 'Invalid token'});

        req.user = decoded;
        next();
    });
};