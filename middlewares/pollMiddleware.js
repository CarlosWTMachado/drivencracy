import joi from 'joi';
import db from '../db/db.js';
import {ObjectId} from 'mongodb';

export async function validaPostPoll(req, res, next) {
	const schema = joi.object({
		title: joi.string().required(),
		expireAt: joi.string().allow('')
	});
	const validation = schema.validate(req.body);
	if(validation.error ) return res.status(422).send(validation.error.details);
	next();
}

export async function VerificaGetPollResults(req, res, next) {
	try {
		const poll = await db.collection("polls").findOne({_id: new ObjectId(req.params.id)});
		if(!poll) return res.sendStatus(404);
		res.locals.poll = poll;
	} catch (error) {
		return res.status(500).send(error);
	}
	next();
}