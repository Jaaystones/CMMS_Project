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

// hardware functions
async function gethardwares() {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute("SELECT * FROM hardware_assets");
        connection.end();
        return rows;
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while fetching hardware.");
    }
}

async function gethardware(id) {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute("SELECT * FROM hardware_assets WHERE hwId = ?", [id]);
        connection.end();
        if (rows.length === 0) {
            throw new Error(`Hardware with ID ${id} not found`);
        }
        return rows[0];
    } catch (error) {
        console.error(error);
        throw new Error(`An error occurred while fetching hardware with ID ${id}`);
    }
}

// software functions
async function getsoftwares() {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute("SELECT * FROM software_assets");
        connection.end();
        return rows;
    } catch (error) {
        console.error(error);
        throw new Error("An error occurred while fetching softwares.");
    }
}

async function getsoftware(id) {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute("SELECT * FROM software_assets WHERE SwId = ?", [id]);
        connection.end();
        if (rows.length === 0) {
            throw new Error(`software with ID ${id} not found`);
        }
        return rows[0];
    } catch (error) {
        console.error(error);
        throw new Error(`An error occurred while fetching software with ID ${id}`);
    }
}

export { getusers, getuser, gethardwares, gethardware, getsoftwares, getsoftware };