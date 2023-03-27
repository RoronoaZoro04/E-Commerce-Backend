const jwt = require('jsonwebtoken')

const genetrateRefreshToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "3d"});

}

module.exports = { genetrateRefreshToken }