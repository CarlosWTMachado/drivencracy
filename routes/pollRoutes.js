import express from 'express';
import {GetPoll, PostPoll, GetPollResults, GetPollAllResults} from '../controllers/pollController.js';
import {validaPostPoll, VerificaGetPollResults} from '../middlewares/pollMiddleware.js';

const router = express.Router();

router.get('/poll', GetPoll);
router.post('/poll', validaPostPoll, PostPoll);
router.get('/poll/:id/result', VerificaGetPollResults, GetPollResults);
router.get('/poll/:id/allResults', VerificaGetPollResults, GetPollAllResults);
export default router;