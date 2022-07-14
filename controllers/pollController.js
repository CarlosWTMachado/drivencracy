import db from '../db/db.js';
import {ObjectId} from 'mongodb';
import {v4 as uuid} from 'uuid';
import dayjs from 'dayjs';

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
			expireAt: (expireAt) ? (expireAt) : (dayjs().add(30, 'day').format('YYYY-MM-DD HH:mm'))
		});
		res.sendStatus(201);
	} catch (error) {
		return res.status(500).send(error);
	}
}

export async function GetPollResults(req, res) {
	const poll = res.locals.poll;
	try {
		const choices = await db.collection("choices").find({pollId: poll._id}).toArray();
		const votes = await Promise.all(
			choices.map(async value => {
				const votes = await db.collection("votes").find({choiceId: value._id}).toArray();
				return {title: value.title, votes: votes.length};
			})
		);
		res.status(200).send({...poll, result: votes.sort(function(a, b){return b.votes - a.votes;})[0]});
	} catch (error) {
		return res.status(500).send(error);
	}
}

export async function GetPollAllResults(req, res) {
	const poll = res.locals.poll;
	try {
		const choices = await db.collection("choices").find({pollId: poll._id}).toArray();
		const votes = await Promise.all(
			choices.map(async value => {
				const votes = await db.collection("votes").find({choiceId: value._id}).toArray();
				return {title: value.title, votes: votes.length};
			})
		);
		res.status(200).send({...poll, results: votes.sort(function(a, b){return b.votes - a.votes;})});
	} catch (error) {
		return res.status(500).send(error);
	}
}