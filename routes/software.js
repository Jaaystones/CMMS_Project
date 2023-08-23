import express from 'express';
import * as db_softwareOps from '../models/db_softwareOps.js';
import { checkToken, verifyUser } from '../auth/loginAuth.js';

const softwareRouter = express.Router();


//get functionn for software
softwareRouter.route('/software').get(async (request, response) => {
    try {
        const result = await db_softwareOps.getsoftwares();
        response.setHeader('Content-Type', 'application/json');
        response.status(201).json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

softwareRouter.route('/software/:id').get(async (request, response) => {
    try {
        const id = request.params.id;
        const result = await db_softwareOps.getsoftware(id);
        response.setHeader('Content-Type', 'application/json');
        response.status(201).json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});


// Software Post request
softwareRouter.route('/software').post(verifyUser, async (request, response) => {
    try {
        const newSoftware = { ...request.body };
        const result = await db_softwareOps.createSoftware(newSoftware);
        response.setHeader('Content-Type', 'application/json');
        response.status(201).json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});


//Software put request
softwareRouter.route('/software/:SwId').put(verifyUser, async (request, response) => {
    try {
        const idToUpdate = parseInt(request.params.SwId, 10);
        const updatedSoftwareData = { ...request.body};
        const result = await db_softwareOps.updateSoftware(idToUpdate, updatedSoftwareData);
        response.setHeader('Content-Type', 'application/json');
        response.status(201).json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});


// Deactivate Function for software assets
softwareRouter.route('/software/:id').delete(verifyUser, async (request, response) => {
    try {
        const idToDelete = parseInt(request.params.id, 10);
        const result = await db_softwareOps.deleteSoftware(idToDelete);
        response.setHeader('Content-Type', 'application/json');
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});


export default softwareRouter;