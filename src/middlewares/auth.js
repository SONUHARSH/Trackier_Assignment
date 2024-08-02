import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        
        if (!authHeader) {
            throw new ApiError(401, "Unauthorized request: No Authorization header provided");
        }

        const token = authHeader.replace('Bearer ', '');

        if (!token) {
            throw new ApiError(401, "Unauthorized request: No token provided");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.id, 'tokens': token });

        if (!user) {
            throw new ApiError(401, "Invalid access token");
        }

        req.token = token;
        req.user = user;
        next();

    } catch (error) {
        console.error(error)
        throw new ApiError(401, error.message || "Invalid access token");
    }
};
