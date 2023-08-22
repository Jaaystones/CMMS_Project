import express from "express";
import { login, register} from '../models/db_auth.js'

const loginRouter = express.Router;

loginRouter.post('/register', register)
loginRouter.post('/login', login)

export default loginRouter