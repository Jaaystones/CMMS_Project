import mysql from 'mysql2/promise';
import connectionConfig from './dbconfig.js';

async function createConnection() {
    return await mysql.createConnection(connectionConfig);
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



//Post method for software
async function createSoftware(newSoftware) {
    try {
        const connection = await createConnection();
        const {
            swName = "Default Software Name",
            swDesc = null,
            purchaseDesc = null,
            purchaseDate = null,
            distributor = null
        } = newSoftware;

        const query = `
            INSERT INTO Software_assets
            (swName, swDesc, purchaseDesc, purchaseDate, distributor)
            VALUES (?, ?, ?, ?, ?)
        `;

        const values = [swName, swDesc, purchaseDesc, purchaseDate, distributor];

        const [result] = await connection.execute(query, values);
        connection.end();

        return {
            success: true,
            message: 'Software asset created successfully',
            insertedId: result.insertId
        };
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating Software asset');
    }
}

export { getsoftwares, getsoftware, createSoftware };