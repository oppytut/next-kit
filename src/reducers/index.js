import { combineReducers } from 'redux';

import quote from './quote';

const reducer = () => combineReducers({ // exporting combineReducers function
	quote
});

export default reducer();
