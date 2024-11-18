
const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from the Authorization header
    //console.log("Token :", token);
    //console.log("Body: ", req.body);
    console.log('Auth reached');
    if (!token) return res.status(401).json({ error: 'Access token is missing' });
    const user = req.headers.userid;
    req.user = user;
    next();

};

module.exports = authenticateUser;

