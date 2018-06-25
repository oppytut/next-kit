import validator from 'validator';

import mzLogger from './mz-logger';

const log = mzLogger('removePunctuation');

const removePunctuation = (word) => {
	const punctuation = [' ', '.', ',', ';', ':', '?', '!', '.', "'", '"', '(', ')', '/', '[', '-']; // dash character must be the last element
	const closedBracket = ']'; // closed bracket not supported by validator.js blacklist

	log.info('return word without puctuation');
	return validator.blacklist(word.replace(closedBracket, ''), punctuation);
};

export default removePunctuation;
