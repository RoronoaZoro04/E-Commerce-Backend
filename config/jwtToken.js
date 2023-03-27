const jwt = require('jsonwebtoken')

const genetrateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "3d"});

}

module.exports = { genetrateToken }