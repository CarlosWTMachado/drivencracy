import db from '../db/db.js';
import {ObjectId} from 'mongodb';
import {v4 as uuid} from 'uuid';

export async function PostChoice(req, res) {
	const {title, poolId} = req.body;
	try {
		await db.collection("choices").insertOne({
			title: title,
			poolId: new ObjectId(poolId)
		});
		res.sendStatus(201);
	} catch (error) {
		return res.status(500).send(error);
	}
}