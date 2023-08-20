import mysql from 'mysql2/promise';
import connectionConfig from './dbconfig.js';

// Password encryption
import bcrypt from 'bcrypt';

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

        // Hash the password
        const saltRounds = 10; // Number of salt rounds to use
        const hashedPassword = await bcrypt.hash(Password, saltRounds);

        const query = `
            INSERT INTO users_credentials
            (First_name, Last_name, Username, Password, Email, Phone_number, City)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [First_name, Last_name, Username, hashedPassword, Email, Phone_number, City];

        const [result] = await connection.execute(query, values);
        connection.end();

        return {
            success: true,
            message: 'New user created successfully',
            insertedId: result.insertId
        };
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating a new User');
    }
}


//Put Function for users
async function updateUser(id, updatedColumns) {
    try {
        const connection = await createConnection();
        let query = 'UPDATE Users_credentials SET ';
        const values = [];

        if ('First_name' in updatedColumns) {
            query += 'First_name = ?, ';
            values.push(updatedColumns.First_name);
        }
        if ('Last_name' in updatedColumns) {
            query += 'Last_name = ?, ';
            values.push(updatedColumns.Last_name);
        }
        if ('Username' in updatedColumns) {
            query += 'Username = ?, ';
            values.push(updatedColumns.Username);
        }
        if ('Password' in updatedColumns) {
            query += 'Password = ?, ';
            values.push(updatedColumns.Password);
        }
        if ('Email' in updatedColumns) {
            query += 'Email = ?, ';
            values.push(updatedColumns.Email);
        }
        if ('Phone_number' in updatedColumns) {
            query += 'Phone_number = ?, ';
            values.push(updatedColumns.Phone_number);
        }
        if ('City' in updatedColumns) {
            query += 'City = ?, ';
            values.push(updatedColumns.City);
        }

        // Remove trailing comma and space
        query = query.slice(0, -2);

        query += ' WHERE Id = ?';
        values.push(id);

        const [result] = await connection.execute(query, values);
        connection.end();

        if (result.affectedRows === 0) {
            throw new Error(`User Credentials with ID ${id} not found`);
        }

        return {
            success: true,
            message: `Users Credentials with ID ${id} updated successfully`
        };
    } catch (error) {
        console.error(error);
        throw new Error(`An error occurred while updating user credentials with ID ${id}`);
    }
}

//Activate and Deactivate Users
// Deactivate Function for users
async function deactivateUser(id) {
    try {
        const connection = await createConnection();
        const query = 'UPDATE Users_credentials SET Status = ? WHERE Id = ?';
        const [result] = await connection.execute(query, ['inactive', id]);
        connection.end();

        if (result.affectedRows === 0) {
            throw new Error(`User Credentials with ID ${id} not found`);
        }

        return {
            success: true,
            message: `Users Credentials with ID ${id} deactivated successfully`
        };
    } catch (error) {
        console.error(error);
        throw new Error(`An error occurred while deactivating user credentials with ID ${id}`);
    }
}
// Activate Function
async function activateUser(id) {
    try {
        const connection = await createConnection();
        const query = 'UPDATE Users_credentials SET Status = ? WHERE Id = ?';
        const [result] = await connection.execute(query, ['active', id]);
        connection.end();

        if (result.affectedRows === 0) {
            throw new Error(`User Credentials with ID ${id} not found`);
        }

        return {
            success: true,
            message: `Users Credentials with ID ${id} has been activated successfully`
        };
    } catch (error) {
        console.error(error);
        throw new Error(`An error occurred while activating user credentials with ID ${id}`);
    }
}




export { getusers, getuser, createUser, updateUser, deactivateUser, activateUser };