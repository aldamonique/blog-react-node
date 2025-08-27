const {body, validationResult} = require('express-validator');

exports.validateRegister =[
    body('name').isLength({min:3}).withMessage('Name must be at least 3 characters long')
    .notEmpty().withMessage('Name is required'),
    body('username')
    .notEmpty().withMessage('Username is required'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please provide a valid email address')
        .normalizeEmail(),     body('password').notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        next();
    }

];
