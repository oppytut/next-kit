import mzLogger from '../../helpers/mz-logger';

import {
	SET_USERS,
	SET_USER,
	ADD_USER,
	UPDATE_USER,
	DEL_USER,
} from './action';

const log = mzLogger('userReducer');

const userReducer = (state = [], action = {}) => {
	switch (action.type) {
	case SET_USERS:
		log.info('users be set');
		return action.user;

	case SET_USER:
		log.info('user be set');
		return action.user;

	case ADD_USER:
		log.info('user added');
		return [...state, action.user];

	case UPDATE_USER:
		log.info('user updated');
		return state.map((item) => {
			if (item.id === action.user.id) return action.user;
			return item;
		});

	case DEL_USER:
		log.info('user deleted');
		return state.filter(item => item.id !== action.id);

	default:
		return state;
	}
};

export default userReducer;
