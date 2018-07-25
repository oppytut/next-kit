import isEmpty from 'is-empty';
import validator from 'validator';

import mzLogger from '../../../../helpers/mz-logger';
import { removePassChar } from '../../../../helpers/remove-punctuation';
import validateWithMongoose from '../../../../helpers/validate-with-mongoose';

const log = mzLogger('userFormCofig');

export const formSanitizer = { // manual type from server
	username: (unsanitized) => {
		const item = unsanitized;

		if (isEmpty(item)) return undefined;

		log.info('return sanitized username');
		return item;
	},
	email: (unsanitized) => {
		const item = unsanitized;

		if (isEmpty(item)) return undefined;

		log.info('return sanitized email');
		return item;
	},
	password: (unsanitized) => {
		const item = unsanitized;

		if (isEmpty(item)) return undefined;

		log.info('return sanitized password');
		return item;
	},
};

export const formRules = { // manual type from server
	username: {
		type: String,
		required: [true, 'Can not be empty!'],
		unique: true,
		uniqueCaseInsensitive: true,
		validate: [
			{
				validator: (v) => {
					const isValid = validator.isAlphanumeric(v);

					log.info(`return username validation result, ${isValid}`);
					return isValid;
				},
				message: 'Must only use letters or numbers!',
			},
			{
				validator: (v) => {
					const isValid = validator.isLength(v, { min: 5, max: 15 });

					log.info(`return username validation length result, ${isValid}`);
					return isValid;
				},
				message: 'Must be between 5 and 15 characters!',
			},
		],
	},
	email: {
		type: String,
		required: [true, 'Can not be empty!'],
		unique: true,
		uniqueCaseInsensitive: true,
		validate: [
			{
				validator: (v) => {
					const isValid = validator.isEmail(v);

					log.info(`return email validation result, ${isValid}`);
					return isValid;
				},
				message: 'Email is invalid!',
			},
		],
	},
	password: {
		type: String,
		required: [true, 'Can not be empty!'],
		validate: [
			{
				validator: (v) => {
					let item = v;
					item = removePassChar(item);
					const isValid = validator.isAlphanumeric(item);

					log.info(`return password validation result, ${isValid}`);
					return isValid;
				},
				message: 'Must only use letters, numbers, or password special characters by owasp except space or backslash!',
			},
			{
				validator: (v) => {
					const isValid = validator.isLength(v, { min: 8, max: 20 });

					log.info(`return username validation length result, ${isValid}`);
					return isValid;
				},
				message: 'Must be between 8 and 20 characters!',
			},
		],
	},
};

export const formItem = Object.getOwnPropertyNames(formRules); // manual type from server

export const formValidator = (user) => {
	const errors = {};
	const validateStatus = {};

	// get errors message
	for (const item of formItem) {
		errors[item] = validateWithMongoose(formSanitizer[item](user[item]), formRules[item], item);
		if (isEmpty(errors[item])) {
			delete errors[item]; // remove undefined errors message
		} else {
			validateStatus[item] = 'error';
		}
	}

	log.info('return form errors and status value');
	return { errors, validateStatus };
};
