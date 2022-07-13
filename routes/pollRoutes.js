import express from 'express';
import {GetPoll, PostPoll, GetPollResults} from '../controllers/pollController.js';
import {validaPostPoll, VerificaGetPollResults} from '../middlewares/pollMiddleware.js';

const router = express.Router();

router.get('/poll', GetPoll);
router.post('/poll', validaPostPoll, PostPoll);
router.get('/poll/:id/result', VerificaGetPollResults, GetPollResults);
export default router;