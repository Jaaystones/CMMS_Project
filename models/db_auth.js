//import mysql from 'mysql2/promise';
//import connectionConfig from './dbconfig.js';
import bcrypt from 'bcrypt';
import { createError } from '../auth/error.js';
import jwt from 'jsonwebtoken'
import * as db_usersOps from './db_usersOps.js';

const secretKey = process.env.JWT_SECRET_KEY;

//Create a connection
//async function createConnection() {
 //   return await mysql.createConnection(connectionConfig);
//}

const register = async (req, res, next) => {
    try{
        //const connection = await createConnection;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.Password, salt);

        const newUser = new db_usersOps.createUser ({
            ...req.body,
            password: hash,
        });

        await newUser.save();
        res.status(200).send('User has been created');
    } catch (err) {
        next(err);
    }
}
// get username
//log in user
const login = async (req, res, next) => {
    try{
        const user = await db_usersOps.findOne({ username: req.body.username });
        if (!user) return next(createError(404, 'User not found!'));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.Password,
            user.Password
        );
        if (!isPasswordCorrect)
        return next(createError(404, 'Invalid Username or Password'));
        
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            secretKey
        );

        const { password, isAdmin, ...otherDetails } = user._doc;
        res
          .cookie("access_token", token, {
            httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
}

export { register, login};