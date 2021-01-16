const jwt = require('jsonwebtoken');

const signOptions = {
    expiresIn:300,
    algorithm: 'RS256'
}

module.exports = {
    signin(id){
        return jwt.sign({id},process.env.PRIVATE_KEY,signOptions);
    },
    verify(req,res,next){
        const { token } = req.headers;
        if(!token)return res.status(401).json({message:"You must provide a token"});
        jwt.verify(token, process.env.PUBLIC_KEY, function(err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
            req.headers.id = decoded.id;
            next();
          });
    }
}
