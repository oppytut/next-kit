import { combineReducers } from 'redux';

import auth from './auth';
import quote from './quote';
import user from './user';

const reducer = () => combineReducers({ // exporting combineReducers function
	auth,
	quote,
	user,
});

export default reducer();
