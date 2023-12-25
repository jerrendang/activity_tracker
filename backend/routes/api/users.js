// signup route
const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('username')
        .exists({ checkFalsey: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters'),
    check('email')
        .exists({ checkFalsey: true })
        .isEmail()
        .withMessage('Please provide a valid email'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email'),
    check('password')
        .exists({ checkFalsey: true })
        .isLength({ min: 6 })
        .withMessage('Please provide a password with at least 6 characters'),
    handleValidationErrors
]

router.post('/', validateSignup, asyncHandler( async (req, res) => { // signup route
    const { email, username, password } = req.body;

    const user = await User.signup({
        username,
        email,
        password
    })

    await setTokenCookie(res, user);

    return res.json({ user });
}))

module.exports = router;