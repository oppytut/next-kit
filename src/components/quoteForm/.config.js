import isEmpty from 'is-empty';
import validator from 'validator';

import mzLogger from '../../libs/mz-logger';
import removePunctuation from '../../libs/remove-punctuation';
import validateWithMongoose from '../../libs/validate-with-mongoose';

const log = mzLogger('quoteFormCofig');

export const formSanitizer = {
	content: (unsanitized) => {
		let item = unsanitized;

		if (isEmpty(item)) return undefined;

		item = validator.ltrim(item, [' ', '.']); // remove space and dot on the left
		item = validator.rtrim(item, [' ', '.']); // remove space and dot on the right
		item += '.'; // last charater is dot
		item = item.charAt(0).toUpperCase() + item.slice(1); // change fist character to uppercase

		log.info('return sanitized content');
		return item;
	},
	inventor: (unsanitized) => {
		let item = unsanitized;

		if (isEmpty(item)) return undefined;

		item = validator.ltrim(item, [' ', '.']); // remove space and dot on the left
		item = validator.rtrim(item, [' ', '.']); // remove space and dot on the right
		item = item.charAt(0).toUpperCase() + item.slice(1); // change fist character to uppercase

		log.info('return sanitized inventor');
		return item;
	},
};

export const formRules = {
	content: {
		required: [true, 'Can not be empty!'],
		validate: [
			{
				validator: (v) => {
					let word = v;
					word = removePunctuation(word);
					const isValid = validator.isAlphanumeric(word);

					log.info(`return content validation result, ${isValid}`);
					return isValid;
				},
				message: 'Must only use letters, numbers, spaces, and punctuation!',
			},
			{
				validator: (v) => {
					const isValid = validator.isLength(v, { min: 10, max: 100 });

					log.info(`return content validation length result, ${isValid}`);
					return isValid;
				},
				message: 'Must be between 10 and 100 characters!',
			},
		],
	},
	inventor: {
		required: [true, 'Can not be empty!'],
		validate: [
			{
				validator: (v) => {
					let word = v;
					word = removePunctuation(word);
					const isValid = validator.isAlphanumeric(word);

					log.info(`return inventor validation result, ${isValid}`);
					return isValid;
				},
				message: 'Must only use letters, numbers, spaces, and punctuation!',
			},
			{
				validator: (v) => {
					const isValid = validator.isLength(v, { min: 5, max: 30 });

					log.info(`return content validation length result, ${isValid}`);
					return isValid;
				},
				message: 'Must be between 5 and 20 characters!',
			},
		],
	},
};

export const formValidator = (quote) => {
	const errors = {};
	const validateStatus = {};

	// get errors message
	for (const item of Object.getOwnPropertyNames(formRules)) {
		errors[item] = validateWithMongoose(formSanitizer[item](quote[item]), formRules[item], item);
		if (isEmpty(errors[item])) {
			delete errors[item]; // remove undefined errors message
		} else {
			validateStatus[item] = 'error';
		}
	}

	log.info(`return form errors and status value ${{ errors, validateStatus }}`);
	return { errors, validateStatus };
};
