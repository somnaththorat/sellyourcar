import jwt from "jsonwebtoken";
import User from "../model/user.schema.js";

const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.jwttoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({ _id: verifyToken._id, "tokens.token": token });
        if (!user) {
            throw new Error('user not found');
        }
        req.token = token;
        req.user = user;
        req.userId = user._id;
        next();
    } catch (error) {
        res.status(401).send("Invalid token");
        console.log(error);
    }
};

export default Authenticate;