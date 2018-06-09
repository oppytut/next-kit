import {
	SET_QUOTES,
	SET_QUOTE,
	ADD_QUOTE,
	UPDATE_QUOTE,
	DEL_QUOTE
} from './action';

export default function quoteReducer(state = [], action = {}) {
	switch (action.type) {
	case SET_QUOTES:
		return action.quotes;

	case SET_QUOTE:
		return action.quote;

	case ADD_QUOTE:
		return [...state, action.quote];

	case UPDATE_QUOTE:
		return state.map((item) => {
			if(item.id === action.quote.id) {
				return action.quote;
			}
			return item;
		});

	case DEL_QUOTE:
		return state.filter(item => item.id !== action.quote.id);

	default:
		return state;
	}
}
