import joi from 'joi';

export async function validaChoice(req, res, next) {
	const schema = joi.object({
		title: joi.string().required(),
		pollId: joi.string().required()
	});
	const validation = schema.validate(req.body);
	if(validation.error ) return res.status(422).send(validation.error.details);
	next();
}