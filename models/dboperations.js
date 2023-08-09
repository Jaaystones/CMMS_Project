import mysql from 'mysql2/promise';
import connectionConfig from './dbconfig.js';

async function createConnection() {
    return await mysql.createConnection(connectionConfig);
}

async function getusers() {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute("SELECT * FROM users_credentials");
        connection.end();
        return rows;
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while fetching users.");
    }
}

async function getuser(id) {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute("SELECT * FROM users_credentials WHERE id = ?", [id]);
        connection.end();
        if (rows.length === 0) {
            throw new Error(`User with ID ${id} not found`);
        }
        return rows[0];
    } catch (error) {
        console.error(error);
        throw new Error(`An error occurred while fetching user with ID ${id}`);
    }
}

export { getusers, getuser };