import mzLogger from '../../helpers/mz-logger';

import {
	SET_QUOTES,
	SET_QUOTE,
	ADD_QUOTE,
	UPDATE_QUOTE,
	DEL_QUOTE,
} from './action';

const log = mzLogger('quoteReducer');

const quoteReducer = (state = [], action = {}) => {
	switch (action.type) {
	case SET_QUOTES:
		log.info('quotes be set');
		return action.quote;

	case SET_QUOTE:
		log.info('quote be set');
		return action.quote;

	case ADD_QUOTE:
		log.info('quote added');
		return [...state, action.quote];

	case UPDATE_QUOTE:
		log.info('quote updated');
		return state.map((item) => {
			if (item.id === action.quote.id) return action.quote;
			return item;
		});

	case DEL_QUOTE:
		log.info('quote deleted');
		return state.filter(item => item.id !== action.id);

	default:
		return state;
	}
};

export default quoteReducer;
