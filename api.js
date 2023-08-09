import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as dboperations from './models/dboperations.js';

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

router.route('/users').get(async (request, response) => {
    try {
        const result = await dboperations.getusers();
        response.json(result);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

router.route('/users/:id').get(async (request, response) => {
    try {
        const id = request.params.id;
        const user = await dboperations.getuser(id);
        response.json(user);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Order API is running at http://localhost:${port}`);
});
