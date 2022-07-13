import db from '../db/db.js';
import {ObjectId} from 'mongodb';
import dayjs from 'dayjs';
import {v4 as uuid} from 'uuid';

export async function PostChoice(req, res) {
	const {title, pollId} = req.body;
	try {
		const poll = await db.collection("polls").findOne({_id: new ObjectId(pollId)});
		if(!poll) return res.sendStatus(404);
		const choice = await db.collection("choices").findOne({title: title});
		if(choice) return res.sendStatus(409);
		if(dayjs(poll.expireAt).isBefore(dayjs())) return res.sendStatus(403);
		await db.collection("choices").insertOne({
			title: title,
			pollId: new ObjectId(pollId)
		});
		res.sendStatus(201);
	} catch (error) {
		return res.status(500).send(error);
	}
}

export async function GetPollChoices(req, res){
	const {id} = req.params;
	try {
		const choices = await db.collection("choices").find({pollId: new ObjectId(id)}).toArray();
		if(!choices) return res.sendStatus(404);
		res.send(choices)
	} catch (error) {
		return res.status(500).send(error);
	}
}