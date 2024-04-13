const {getUserIdFromToken} = require('../config/jwtProvider.js')
const userService = require('../services/userService.js')

const authenticate = async(req,res,next) => {
    try {
        const token=req.headers.authorization?.splite(" ")[1]

        if(!token){
            return res.status(401).json({message:"No token provided"})
        }
        const userId=getUserIdFromToken(token)
        const user = userService.findUserById(userId);

        req.user = user;

    } catch (error) {
        return res.send({error: error.message})
    }

    next();
}