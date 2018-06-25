import fetch from 'cross-fetch';
import mzLogger from '../../libs/mz-logger';

const log = mzLogger('quoteAction');

export const SET_QUOTES = 'SET_QUOTES';
export const SET_QUOTE = 'SET_QUOTE';
export const ADD_QUOTE = 'ADD_QUOTE';
export const UPDATE_QUOTE = 'UPDATE_QUOTE';
export const DEL_QUOTE = 'DEL_QUOTE';

const handleResponse = async (response) => {
	if (response.ok) {
		log.info('return response');
		return response;
	}

	const err = new Error(response.statusText);
	await response.json().then((e) => {
		err.errors = e.err.errors;
	});
	log.warn('return err response');
	throw err;
};

const parseJson = response => response.json();

/**
 * to store
 */

export const setQuotes = quote => ({ type: SET_QUOTES, quote });
export const setQuote = quote => ({ type: SET_QUOTE, quote });
export const addQuote = quote => ({ type: ADD_QUOTE, quote });
export const updateQuote = quote => ({ type: UPDATE_QUOTE, quote });
export const delQuote = id => ({ type: DEL_QUOTE, id });

/**
 * to api
 */

const host = 'http://localhost:8000';

export const getQuotes = () => fetch(`${host}/api/quote`)
	.then(handleResponse)
	.then(parseJson);

export const getQuote = id => fetch(`${host}/api/quote/${id}`)
	.then(handleResponse)
	.then(parseJson);

export const postQuote = data => fetch(`${host}/api/quote`, {
	method: 'post',
	body: JSON.stringify(data),
	headers: { 'Content-Type': 'application/json' }
})
	.then(handleResponse)
	.then(parseJson);

export const putQuote = data => fetch(`${host}/api/quote/${data.id}`, {
	method: 'put',
	body: JSON.stringify(data),
	headers: { 'Content-Type': 'application/json' }
})
	.then(handleResponse)
	.then(parseJson);

export const deleteQuote = id => fetch(`${host}/api/quote/${id}`, {
	method: 'delete',
	headers: { 'Content-Type': 'application/json' }
})
	.then(handleResponse)
	.then(parseJson);
