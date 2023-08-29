import express from "express";
import { login, register} from '../models/db_auth.js'

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);


export default authRouter