import jwt from 'jsonwebtoken';
import { createError } from '../auth/error.js';
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

const checkToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(createError(401, 'You are not authorized!'));
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return next(createError(403, 'Token not valid!' ));
        req.user = decoded; // Store user information in the request object
        next();
    });
};

const verifyUser = (req, res, next) => {
    checkToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
    } else {
        return next(createError(403, 'You are not Authorized'));
    }
});
}

export { checkToken, verifyUser };