import { combineReducers } from 'redux';

import quote from './quote';

const reducer = () => combineReducers({
	quote
});

export default reducer;
