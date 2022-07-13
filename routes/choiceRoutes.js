import express from 'express';
import {PostChoice, GetPollChoices} from '../controllers/choiceController.js';
import {validaChoice} from '../middlewares/choiceMiddleware.js';

const router = express.Router();

router.get('/poll/:id/choice', GetPollChoices);
router.post('/choice', validaChoice, PostChoice);
export default router;