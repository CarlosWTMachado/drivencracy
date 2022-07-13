import db from '../db/db.js';
import {ObjectId} from 'mongodb';
import dayjs from 'dayjs';
import {v4 as uuid} from 'uuid';

export async function PostChoice(req, res) {
	const {title, pollId} = req.body;
	try {
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
		res.send(choices)
	} catch (error) {
		return res.status(500).send(error);
	}
}

export async function PostChoiceVote(req, res){
	const {id} = req.params;
	try {
		await db.collection("votes").insertOne({
			createdAt: dayjs().format('YYYY-MM-DD HH:mm'),
			choiceId: new ObjectId(id)
		});
		res.sendStatus(201);
	} catch (error) {
		return res.status(500).send(error);
	}
}