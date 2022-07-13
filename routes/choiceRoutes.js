import express from 'express';
import {PostChoice, GetPollChoices, PostChoiceVote} from '../controllers/choiceController.js';
import {validaPostChoice, VerificaPostChoice, VerificaGetPollChoices, VerificaPostChoiceVote} from '../middlewares/choiceMiddleware.js';

const router = express.Router();

router.get('/poll/:id/choice', VerificaGetPollChoices, GetPollChoices);
router.post('/choice', validaPostChoice, VerificaPostChoice, PostChoice);
router.post('/choice/:id/vote', VerificaPostChoiceVote, PostChoiceVote);
export default router;