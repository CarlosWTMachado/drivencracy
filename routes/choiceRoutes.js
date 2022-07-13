import express from 'express';
import {PostChoice, GetPollChoices, PostChoiceVote} from '../controllers/choiceController.js';
import {validaChoice, VerificaSeExistePostChoice, VerificaSeExisteGetPollChoices, VerificaSeExistePostChoiceVote} from '../middlewares/choiceMiddleware.js';

const router = express.Router();

router.get('/poll/:id/choice', VerificaSeExisteGetPollChoices, GetPollChoices);
router.post('/choice', validaChoice, VerificaSeExistePostChoice, PostChoice);
router.post('/choice/:id/vote', VerificaSeExistePostChoiceVote, PostChoiceVote);
export default router;