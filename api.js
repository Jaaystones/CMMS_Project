import express from 'express';
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import * as usersRoute from './routes/users.js'
import * as hardwareRoute from './routes/hardware.js'
import * as softwareRoute from './routes/software.js'
import cookieParser from 'cookie-parser'
import cors from 'cors';



const app = express();
dotenv.config();

//Middlewares
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(usersRoute.default);
app.use(hardwareRoute.default);
app.use(softwareRoute.default);





const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Backend API is running at http://localhost:${port}`);
});
