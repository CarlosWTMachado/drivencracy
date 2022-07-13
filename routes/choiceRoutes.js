import express from 'express';
import {PostChoice} from '../controllers/choiceController.js';
//import {} from '../middlewares/choiceMiddleware.js';

const router = express.Router();

//router.get('/poll', GetPoll);
router.post('/choice', PostChoice);
export default router;