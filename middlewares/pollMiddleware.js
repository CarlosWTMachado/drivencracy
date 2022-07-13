import joi from 'joi';

export async function validaPoll(req, res, next) {
	const schema = joi.object({
		title: joi.string().required(),
		expireAt: joi.string()
	});
	const validation = schema.validate(req.body);
	if(validation.error ) return res.status(422).send(validation.error.details);
	next();
}