import express from 'express';
import {GetPoll, PostPoll} from '../controllers/pollController.js';
//import {} from '../middlewares/productsMiddleware.js';

const router = express.Router();

router.get('/poll', GetPoll);
router.post('/poll', PostPoll);
export default router;