const jwt = require('jsonwebtoken');
const UserController = require('./userController')
const middleware = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token
        if (token) {
            const accessToken = token.split(" ")[1]
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json("Token is invalid")
                }
                req.user = user;
                next();
            })
        }
        else {
            console.log(token)
            return res.status(401).json("You're not authenticated")
        }
    },
    verifyTokenAndAdminAuth: (req, res, next) => {
        middleware.verifyToken = (req, res, next) => {
            if (req.user.id == req.param.id || req.user.admin) {
                next()
            }
            else {
                return res.status(403).json("You're not allow to do this")
            }
        }
    }
}
module.exports = middleware;