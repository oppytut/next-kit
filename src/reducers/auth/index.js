import isEmpty from 'is-empty';
// import jwt from 'jsonwebtoken';

import mzLogger from '../../helpers/mz-logger';

// import jwtConfig from '../../../configs/jwt';

import { SET_SIGNED } from './action';

const log = mzLogger('authReducer');

// found problem with ssr
// const user = localStorage.getItem('petuahToken');
const initialState = {
	isAuthenticated: false,
	user: {},
};

const authReducer = (state = initialState, action = {}) => {
	switch (action.type) {
	case SET_SIGNED:
		log.info('set signed');
		return {
			isAuthenticated: !isEmpty(action.user),
			user: action.user,
		};

	default:
		return state;
	}
};

export default authReducer;
