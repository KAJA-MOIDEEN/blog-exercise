const jwt = require('jsonwebtoken');

const genarateToken = (res,_id)=>{
    const token = jwt.sign({_id},process.env.JWT_SECRET_KEY,{expiresIn:'1h'});
    res.cookie("token", token, {
        httpOnly: true,           
        maxAge: 12 * 60 * 60 * 1000,       
        secure: process.env.NODE_ENV !== 'development', 
        sameSite: "strict",            
    });
    return token;
}

module.exports = genarateToken