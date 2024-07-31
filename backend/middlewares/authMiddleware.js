import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from './asyncHandler.js'

const authenticate = asyncHandler(async (req, res, next) => {
    let token
    token = req.cookies.jwt

    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password')
        } catch(error) { 
            res.status(401)
            throw new Error('Not authorized, token failded 😥')
        }
    } else {
        res.status(401)
        throw new Error('Not authorized, token failded 😥')
    }
})

const authorizeAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).send('You are not an admin 🤣')
    }
}

export { authenticate, authorizeAdmin }