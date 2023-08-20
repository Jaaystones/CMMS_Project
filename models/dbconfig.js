import dotenv from 'dotenv';
dotenv.config();

const connectionConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    database: process.env.MYSQL_DB,
    port: parseInt(process.env.DB_PORT),
};

export default connectionConfig;