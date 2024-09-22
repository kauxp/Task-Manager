import jwt from 'jsonwebtoken';

const authToken = async (req, res, next) => {
    // const token = req.headers.authorization.split(" ")[1];
    const token =""
    // if(!token) return res.status(401).json({message: "Unauthorized"});
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(error){
        return res.status(500).json({message: "Error: ", error});
    }
};

export default authToken;