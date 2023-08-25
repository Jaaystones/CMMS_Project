import express from 'express';
import * as db_usersOps from '../models/db_usersOps.js';
import { checkToken, verifyUser } from '../auth/loginAuth.js';

const userRouter = express.Router();

// Get all users
userRouter.route('/users').get(checkToken, verifyUser, async (request, response) => {
    try {
        const result = await db_usersOps.getusers();
        response.setHeader('Content-Type', 'application/json');
        response.status(200).json(result); // Use 200 for successful GET requests
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

// Get a specific user by ID
userRouter.route('/users/:id').get(verifyUser, async (request, response) => {
    try {
        const id = request.params.id;
        const result = await db_usersOps.getuser(id);
        response.setHeader('Content-Type', 'application/json');
        response.status(200).json(result); // Use 200 for successful GET requests
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

// Update a user by ID
// the update func has be created in auth to hash passwords
userRouter.route('/users/:Id').put(verifyUser, async (request, response) => {
    try {
        const idToUpdate = parseInt(request.params.Id, 10);
        const updatedUserData = { ...request.body };
        const result = await db_usersOps.updateUser(idToUpdate, updatedUserData);
        response.setHeader('Content-Type', 'application/json');
        response.status(200).json(result); // Use 200 for successful PUT requests
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

// Create a new user
//userRouter.route('/users').post(verifyUser, async (request, response) => {
//    try {
//        const newUser = { ...request.body };
//       const result = await db_usersOps.createUser(newUser);
//        response.setHeader('Content-Type', 'application/json');
//        response.status(201).json(result); // Use 201 for successful POST requests
//    } catch (error) {
//        response.status(500).json({ error: error.message });
//    }
//});

// Deactivate a user by ID
userRouter.route('/users/:id/deactivate').put(verifyUser, async (request, response) => {
    try {
        const idToDeactivate = parseInt(request.params.id, 10);
        const result = await db_usersOps.deactivateUser(idToDeactivate);
        response.setHeader('Content-Type', 'application/json');
        response.status(200).json(result); // Use 200 for successful PUT requests
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

// Activate a user by ID
userRouter.route('/users/:id/activate').put(verifyUser, async (request, response) => {
    try {
        const idToActivate = parseInt(request.params.id, 10);
        const result = await db_usersOps.activateUser(idToActivate);
        response.setHeader('Content-Type', 'application/json');
        response.status(200).json(result); // Use 200 for successful PUT requests
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

export default userRouter;
