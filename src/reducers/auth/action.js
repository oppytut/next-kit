import fetch from 'cross-fetch';
import jwt from 'jsonwebtoken';

import mzLogger from '../../helpers/mz-logger';
import setAuthorizationToken from '../../helpers/set-authorization-token';

import jwtConfig from '../../../configs/jwt';

const log = mzLogger('authAction');

export const SET_SIGNED = 'SET_SIGNED';

const handleResponse = async (response) => {
	if (response.ok) {
		log.info('return response');
		return response;
	}

	const err = new Error(response.statusText);
	await response.json().then((e) => {
		err.errors = e.err.errors;
		err.message = e.err.message;
	});
	log.warn('return err response');
	throw err;
};

const parseJson = response => response.json();

/**
 * to store
 */
export const setSigned = user => ({ type: SET_SIGNED, user });

/**
 * to api
 */

const host = 'http://localhost:8000';

export const signUp = data => fetch(`${host}/api/auth/signup`, {
	method: 'post',
	body: JSON.stringify(data),
	headers: { 'Content-Type': 'application/json' },
})
	.then(handleResponse)
	.then(parseJson);

export const logIn = (data, dispatch) => fetch(`${host}/api/auth/login`, {
	method: 'post',
	body: JSON.stringify(data),
	headers: { 'Content-Type': 'application/json' },
})
	.then(handleResponse)
	.then(parseJson)
	.then((res) => {
		const { token } = res;
		const user = jwt.verify(token, jwtConfig.secret);

		localStorage.setItem('petuahToken', token);
		setAuthorizationToken(token);

		return dispatch(setSigned(user));
	});


export const logOut = (dispatch) => {
	localStorage.removeItem('petuahToken');
	setAuthorizationToken();

	return dispatch(setSigned());
};
