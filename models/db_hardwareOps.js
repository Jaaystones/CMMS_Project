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
            hwDesc = "",
            purchaseDesc = "",
            purchaseDate = "",
            distributor = ""
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

// Put Function for Hardware
async function updateHardware(id, updatedColumns) {
    try {
        const connection = await createConnection();
        let query = 'UPDATE Hardware_assets SET ';
        const values = [];

        if ('HwId' in updatedColumns) {
            query += 'HwId = ?, ';
            values.push(updatedColumns.HwId);
        }
        if ('hwName' in updatedColumns) {
            query += 'hwName = ?, ';
            values.push(updatedColumns.hwName);
        }
        if ('hwDesc' in updatedColumns) {
            query += 'hwDesc = ?, ';
            values.push(updatedColumns.hwDesc);
        }
        if ('purchaseDesc' in updatedColumns) {
            query += 'purchaseDesc = ?, ';
            values.push(updatedColumns.purchaseDesc);
        }
        if ('purchaseDate' in updatedColumns) {
            query += 'purchaseDate = ?, ';
            values.push(updatedColumns.purchaseDate);
        }
        if ('distributor' in updatedColumns) {
            query += 'distributor = ?, ';
            values.push(updatedColumns.distributor);
        }

        // Remove trailing comma and space
        query = query.slice(0, -2);

        query += ' WHERE HwId = ?';
        values.push(id);

        const [result] = await connection.execute(query, values);
        connection.end();

        if (result.affectedRows === 0) {
            throw new Error(`Hardware asset with ID ${id} not found`);
        }

        return {
            success: true,
            message: `Hardware asset with ID ${id} updated successfully`
        };
    } catch (error) {
        console.error(error);
        throw new Error(`An error occurred while updating hardware asset with ID ${id}`);
    }
}

//Delete Hardware
// Delete Function for Hardware
async function deleteHardware(id) {
    try {
        const connection = await createConnection();
        const query = 'DELETE FROM Hardware_assets WHERE hwId = ?';
        const [result] = await connection.execute(query, [id]);
        connection.end();

        if (result.affectedRows === 0) {
            throw new Error(`Hardware Assets with ID ${id} not found`);
        }

        return {
            success: true,
            message: `Hardware Assets with ID ${id} deleted successfully`
        };
    } catch (error) {
        console.error(error);
        throw new Error(`An error occurred while deleting Hardware Assets with ID ${id}`);
    }
}

export { gethardware, gethardwares, createHardware, updateHardware, deleteHardware };