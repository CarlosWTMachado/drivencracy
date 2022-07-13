import express, { json } from 'express';
import cors from 'cors';
import PollRoutes from './routes/pollRoutes.js';

const server = express();
server.use(cors());
server.use(json());

server.use(PollRoutes);

server.listen(process.env.PORT, () => {
	console.log("Rodando ...");
});