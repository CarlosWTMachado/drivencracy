import db from '../db/db.js';
import {ObjectId} from 'mongodb';
import {v4 as uuid} from 'uuid';

export async function GetPoll(req, res) {
	try {
		const polls = await db.collection("polls").find({}).toArray();
		res.status(200).send(polls);
	} catch (error) {
		return res.status(500).send(error);
	}
}

export async function PostPoll(req, res) {
	const {title, expireAt} = req.body;
	try {
		await db.collection("polls").insertOne({
			title: title,
			expireAt: expireAt
		});
		res.sendStatus(201);
	} catch (error) {
		return res.status(500).send(error);
	}
}