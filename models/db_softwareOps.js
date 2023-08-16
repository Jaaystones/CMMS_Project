import mysql from 'mysql2/promise';
import connectionConfig from './dbconfig.js';

async function createConnection() {
    return await mysql.createConnection(connectionConfig);
}


// get method software functions
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
            HwId = null,
            Id = null,
            swName = "Default Software Name",
            swDesc = null,
            purchaseDesc = null,
            purchaseDate = null,
            distributor = null
        } = newSoftware;

        const query = `
            INSERT INTO Software_assets
            (hwId, Id, swName, swDesc, purchaseDesc, purchaseDate, distributor)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [HwId, Id, swName, swDesc, purchaseDesc, purchaseDate, distributor];

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

// Put method
// Random Software
async function updateSoftware(id, updatedColumns) {
    try {
        const connection = await createConnection();
        let query = 'UPDATE Software_assets SET ';
        const values = [];

        if ('HwId' in updatedColumns) {
            query += 'HwId = ?, ';
            values.push(updatedColumns.HwId);
        }
        if ('Id' in updatedColumns) {
            query += 'Id = ?, ';
            values.push(updatedColumns.Id);
        }
        if ('swName' in updatedColumns) {
            query += 'swName = ?, ';
            values.push(updatedColumns.swName);
        }
        if ('swDesc' in updatedColumns) {
            query += 'swDesc = ?, ';
            values.push(updatedColumns.swDesc);
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

        query += ' WHERE SwId = ?';
        values.push(id);

        const [result] = await connection.execute(query, values);
        connection.end();

        if (result.affectedRows === 0) {
            throw new Error(`Software asset with ID ${id} not found`);
        }

        return {
            success: true,
            message: `Software asset with ID ${id} updated successfully`
        };
    } catch (error) {
        console.error(error);
        throw new Error(`An error occurred while updating software asset with ID ${id}`);
    }
}

//Delete Software
// Delete Function for Software
async function deleteSoftware(id) {
    try {
        const connection = await createConnection();
        const query = 'DELETE FROM Software_assets WHERE swId = ?';
        const [result] = await connection.execute(query, [id]);
        connection.end();

        if (result.affectedRows === 0) {
            throw new Error(`Software Assets with ID ${id} not found`);
        }

        return {
            success: true,
            message: `Software Assets with ID ${id} deleted successfully`
        };
    } catch (error) {
        console.error(error);
        throw new Error(`An error occurred while deleting uSoftware Assets with ID ${id}`);
    }
}

export { getsoftware, getsoftwares, createSoftware, updateSoftware, deleteSoftware };