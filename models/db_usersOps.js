import mysql from 'mysql2/promise';
import connectionConfig from './dbconfig.js';

//Create a connection
async function createConnection() {
    return await mysql.createConnection(connectionConfig);
}

// Get Functions
// Function to get Users from the Users_crediential table
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

//Function to retrieve users using their ubique ids
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

//Post Functions
//post function for users
async function createUser(newUser) {
    try {
        const connection = await createConnection();
        const {
            First_name = "value",
            Last_name = "value",
            Username = "value",
            Password = "value",
            Email = "value",
            Phone_number = "value",
            City = "value",
        } = newUser;

        const query = `
            INSERT INTO users_credentials
            (First_name, Last_name, Username, Password, Email, Phone_number, City)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [First_name, Last_name, Username, Password, Email, Phone_number, City];

        const [result] = await connection.execute(query, values);
        connection.end();

        return {
            success: true,
            message: 'New user created successfully',
            insertedId: result.insertId
        };
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating new User');
    }
}




export { getusers, getuser, createUser };