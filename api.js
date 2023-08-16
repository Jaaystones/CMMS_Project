import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as db_softwareOps from './models/db_softwareOps.js';
import * as db_usersOps from './models/db_usersOps.js';
import * as db_hardwareOps from './models/db_hardwareOps.js';

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
    console.log('middleware');
    next();
});

//Users Get requests
router.route('/users').get(async (request, response) => {
    try {
        const result = await db_usersOps.getusers();
        response.setHeader('Content-Type', 'application/json');
        response.status(201).json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

router.route('/users/:id').get(async (request, response) => {
    try {
        const id = request.params.id;
        const result = await db_usersOps.getuser(id);
        response.setHeader('Content-Type', 'application/json');
        response.status(201).json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

//hardware get requests
router.route('/hardware').get(async (request, response) => {
    try {
        const result = await db_hardwareOps.gethardwares();
        response.setHeader('Content-Type', 'application/json');
        response.status(201).json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

router.route('/hardware/:id').get(async (request, response) => {
    try {
        const id = request.params.id;
        const result = await db_hardwareOps.gethardware(id);
        response.setHeader('Content-Type', 'application/json');
        response.status(201).json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

//get functionn for software
router.route('/software').get(async (request, response) => {
    try {
        const result = await db_softwareOps.getsoftwares();
        response.setHeader('Content-Type', 'application/json');
        response.status(201).json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

router.route('/software/:id').get(async (request, response) => {
    try {
        const id = request.params.id;
        const result = await db_softwareOps.getsoftware(id);
        response.setHeader('Content-Type', 'application/json');
        response.status(201).json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

// Post requests
//Users post request for creating a new User
router.route('/users').post(async (request, response) => {
    try {
        const newUser = { ...request.body };
        const result = await db_usersOps.createUser(newUser);
        response.setHeader('Content-Type', 'application/json');
        response.status(201).json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});


// Hardware POST request for creating a new hardware asset
router.route('/hardware').post(async (request, response) => {
    try {
        const newHardware = { ...request.body };
        const result = await db_hardwareOps.createHardware(newHardware);
        response.setHeader('Content-Type', 'application/json');
        response.status(201).json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

// Software Post request
router.route('/software').post(async (request, response) => {
    try {
        const newSoftware = { ...request.body };
        const result = await db_softwareOps.createSoftware(newSoftware);
        response.setHeader('Content-Type', 'application/json');
        response.status(201).json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

//Put Requests
// Users Requests
router.route('/users/:Id').put(async (request, response) => {
    try {
        const idToUpdate = parseInt(request.params.Id, 10);
        const updatedUserData = { ...request.body};
        const result = await db_usersOps.updateUser(idToUpdate, updatedUserData);
        response.setHeader('Content-Type', 'application/json');
        response.status(201).json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});


//Software put request
router.route('/software/:SwId').put(async (request, response) => {
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


// Hardware put request
router.route('/hardware/:HwId').put(async (request, response) => {
    try {
        const idToUpdate = parseInt(request.params.HwId, 10);
        const updatedHardwareData = { ...request.body};
        const result = await db_hardwareOps.updateHardware(idToUpdate, updatedHardwareData);
        response.setHeader('Content-Type', 'application/json');
        response.status(201).json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

// Delete Requests
// Deactivate Function for users
router.route('/users/:id/deactivate').put(async (request, response) => {
    try {
        const idToDeactivate = parseInt(request.params.id, 10);
        const result = await db_usersOps.deactivateUser(idToDeactivate);
        response.setHeader('Content-Type', 'application/json');
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

//Activate Fucvtion for users
router.route('/users/:id/activate').put(async (request, response) => {
    try {
        const idToActivate = parseInt(request.params.id, 10);
        const result = await db_usersOps.activateUser(idToActivate);
        response.setHeader('Content-Type', 'application/json');
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});



// Delete Function for hardware assets
router.route('/hardware/:id').delete(async (request, response) => {
    try {
        const idToDelete = parseInt(request.params.id, 10);
        const result = await db_hardwareOps.deleteHardware(idToDelete);
        response.setHeader('Content-Type', 'application/json');
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

// Deactivate Function for software assets
router.route('/software/:id').delete(async (request, response) => {
    try {
        const idToDelete = parseInt(request.params.id, 10);
        const result = await db_softwareOps.deleteSoftware(idToDelete);
        response.setHeader('Content-Type', 'application/json');
        response.status(200).json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});




const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Order API is running at http://localhost:${port}`);
});
