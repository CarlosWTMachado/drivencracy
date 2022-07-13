import express from 'express';
import {PostChoice} from '../controllers/choiceController.js';
import {validaChoice} from '../middlewares/choiceMiddleware.js';

const router = express.Router();

//router.get('/poll', GetPoll);
router.post('/choice', validaChoice, PostChoice);
export default router;