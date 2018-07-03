import fetch from 'cross-fetch';

import mzLogger from '../../helpers/mz-logger';

const log = mzLogger('userAction');

export const SET_USERS = 'SET_USERS';
export const SET_USER = 'SET_USER';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DEL_USER = 'DEL_USER';

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

export const setUsers = user => ({ type: SET_USERS, user });
export const setUser = user => ({ type: SET_USER, user });
export const addUser = user => ({ type: ADD_USER, user });
export const updateUser = user => ({ type: UPDATE_USER, user });
export const delUser = id => ({ type: DEL_USER, id });

/**
 * to api
 */

const host = 'http://localhost:8000';

export const getUsers = () => fetch(`${host}/api/user`)
	.then(handleResponse)
	.then(parseJson);

export const getUser = id => fetch(`${host}/api/user/${id}`)
	.then(handleResponse)
	.then(parseJson);

export const postUser = data => fetch(`${host}/api/user`, {
	method: 'post',
	body: JSON.stringify(data),
	headers: { 'Content-Type': 'application/json' },
})
	.then(handleResponse)
	.then(parseJson);

export const putUser = data => fetch(`${host}/api/user/${data.id}`, {
	method: 'put',
	body: JSON.stringify(data),
	headers: { 'Content-Type': 'application/json' },
})
	.then(handleResponse)
	.then(parseJson);

export const deleteUser = id => fetch(`${host}/api/user/${id}`, {
	method: 'delete',
	headers: { 'Content-Type': 'application/json' },
})
	.then(handleResponse)
	.then(parseJson);
