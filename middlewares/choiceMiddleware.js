import joi from 'joi';
import db from '../db/db.js';
import {ObjectId} from 'mongodb';
import dayjs from 'dayjs';

export async function validaChoice(req, res, next) {
	const schema = joi.object({
		title: joi.string().required(),
		pollId: joi.string().required()
	});
	const validation = schema.validate(req.body);
	if(validation.error ) return res.status(422).send(validation.error.details);
	next();
}

export async function VerificaSeExistePostChoice(req, res, next){
	try {
		const poll = await db.collection("polls").findOne({_id: new ObjectId(req.body.pollId)});
		if(!poll) return res.sendStatus(404);

		const choice = await db.collection("choices").findOne({title: req.body.title});
		if(choice) return res.sendStatus(409);

		if(dayjs(poll.expireAt).isBefore(dayjs())) return res.sendStatus(403);

		next();
	} catch (error) {
		return res.status(500).send(error);
	}
}

export async function VerificaSeExisteGetPollChoices(req, res, next){
	try {
		const poll = await db.collection("polls").findOne({_id: new ObjectId(req.params.id)});
		if(!poll) return res.sendStatus(404);
		next();
	} catch (error) {
		return res.status(500).send(error);
	}
}

export async function VerificaSeExistePostChoiceVote(req, res, next){
	try {
		const choice = await db.collection("choices").findOne({_id: new ObjectId(req.params.id)});
		if(!choice) return res.sendStatus(404);

		const poll = await db.collection("polls").findOne({_id: choice.pollId});

		if(dayjs(poll.expireAt).isBefore(dayjs())) return res.sendStatus(403);
		next();
	} catch (error) {
		return res.status(500).send(error);
	}
}