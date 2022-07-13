import express from 'express';
import {PostChoice, GetPollChoices} from '../controllers/choiceController.js';
import {validaChoice, VerificaSeExistePostChoice, VerificaSeExisteGetPollChoices} from '../middlewares/choiceMiddleware.js';

const router = express.Router();

router.get('/poll/:id/choice', VerificaSeExisteGetPollChoices, GetPollChoices);
router.post('/choice', validaChoice, VerificaSeExistePostChoice, PostChoice);
export default router;