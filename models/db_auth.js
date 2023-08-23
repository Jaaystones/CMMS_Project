import mysql from 'mysql2/promise';
import connectionConfig from './dbconfig.js';
import bcrypt from 'bcrypt';
import { createError } from '../auth/error.js';
import jwt from 'jsonwebtoken';
import * as db_usersOps from './db_usersOps.js';

const secretKey = process.env.JWT_SECRET_KEY;

// Create a connection
async function createConnection() {
  return await mysql.createConnection(connectionConfig);
}

const register = async (req, res, next) => {
  try {
    const connection = await createConnection();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.Password, salt);

    const newUser = {
      ...req.body,
      Password: hash,
    };

    // Call the createUser function from db_usersOps module
    await db_usersOps.createUser(newUser);
    connection.end();

    res.status(200).json({
      success: true,
      message: 'User Created!',
      token: token
    });

  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const connection = await createConnection();
    const user = await db_usersOps.getusersName(req.body.Username);
    await connection.end();
    if (!user) {
      return next(createError(400, 'Invalid request. Username not valid.'));
  }

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

    const { password, isAdmin, ...otherDetails } = user;
    res.cookie('access_token', token, {
        httpOnly: true,
      });
      res.status(200).json({
        success: true,
        message: 'Login successful.',
        details: otherDetails,
        isAdmin: user.isAdmin,
        token: token
    });
  } catch (err) {
    next(err);
  }
};

export { register, login };