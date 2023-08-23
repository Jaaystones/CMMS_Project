import express from 'express';
import * as db_hardwareOps from '../models/db_hardwareOps.js';
import { checkToken, verifyUser } from '../auth/loginAuth.js';

const hardwareRouter = express.Router();

// Hardware get requests
hardwareRouter.route('/hardware').get(async (request, response) => {
    try {
        const result = await db_hardwareOps.gethardwares();
        response.setHeader('Content-Type', 'application/json');
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

hardwareRouter.route('/hardware/:id').get(async (request, response) => {
    try {
        const id = request.params.id;
        const result = await db_hardwareOps.gethardware(id);
        response.setHeader('Content-Type', 'application/json');
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

// Hardware POST request for creating a new hardware asset
hardwareRouter.route('/hardware').post(verifyUser, async (request, response) => {
    try {
        const newHardware = { ...request.body };
        const result = await db_hardwareOps.createHardware(newHardware);
        response.setHeader('Content-Type', 'application/json');
        response.status(201).json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

// Hardware PUT request for updating hardware
hardwareRouter.route('/hardware/:HwId').put(verifyUser, async (request, response) => {
    try {
        const idToUpdate = parseInt(request.params.HwId, 10);
        const updatedHardwareData = { ...request.body };
        const result = await db_hardwareOps.updateHardware(idToUpdate, updatedHardwareData);
        response.setHeader('Content-Type', 'application/json');
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

// Delete Function for hardware assets
hardwareRouter.route('/hardware/:id').delete(verifyUser, async (request, response) => {
    try {
        const idToDelete = parseInt(request.params.id, 10);
        const result = await db_hardwareOps.deleteHardware(idToDelete);
        response.setHeader('Content-Type', 'application/json');
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

export default hardwareRouter;