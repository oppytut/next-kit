import axios from 'axios';
import isEmpty from 'is-empty';

const setAuthorizationToken = (token) => {
	if (!isEmpty(token)) {
		axios.defaults.headers.common.Authorization = `Bearer ${token}`;
	}

	delete axios.defaults.headers.common.Authorization;
};

export default setAuthorizationToken;
