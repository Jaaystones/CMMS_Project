import mysql from 'mysql2/promise';
import connectionConfig from './dbconfig.js';

//Create a connection
async function createConnection() {
    return await mysql.createConnection(connectionConfig);
}

// Get Functions
// Function to get hardwares from the hardware_assests table
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

//Post Functions
async function createHardware(newHardware) {
    try {
        const connection = await createConnection();
        const {
            hwName = "Default Hardware Name",
            hwDesc = null,
            purchaseDesc = null,
            purchaseDate = null,
            distributor = null
        } = newHardware;

        const query = `
            INSERT INTO hardware_assets
            (hwName, hwDesc, purchaseDesc, purchaseDate, distributor)
            VALUES (?, ?, ?, ?, ?)
        `;

        const values = [hwName, hwDesc, purchaseDesc, purchaseDate, distributor];

        const [result] = await connection.execute(query, values);
        connection.end();

        return {
            success: true,
            message: 'Hardware asset created successfully',
            insertedId: result.insertId
        };
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating hardware asset');
    }
}

export { gethardware, gethardwares, createHardware };