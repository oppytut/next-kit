import mzLogger from '../../libs/mz-logger';

const log = mzLogger('quoteAction');

export const SET_QUOTES = 'SET_QUOTES';
export const SET_QUOTE = 'SET_QUOTE';
export const ADD_QUOTE = 'ADD_QUOTE';
export const UPDATE_QUOTE = 'UPDATE_QUOTE';
export const DEL_QUOTE = 'DEL_QUOTE';

function handleResponse(response) {
	if(response.ok) {
		log.info('response ok');
		return response;
	}

	log.warn('response error');
	const err = new Error(response.statusText);
	err.response = response;
	throw err;
}

function parseJson(response) {
	return response.json();
}

/**
 * to store
 */

export const setQuotes = quotes => ({ type: SET_QUOTES, quotes });
export const setQuote = quote => ({ type: SET_QUOTE, quote });
export const addQuote = quote => ({ type: ADD_QUOTE, quote });
export const updateQuote = quote => ({ type: UPDATE_QUOTE, quote });
export const delQuote = quote => ({ type: DEL_QUOTE, quote });

/**
 * to api
 */

const host = 'http://localhost:8000';

export const getQuotes = data => fetch(`${host}/api/quote`)
	.then(handleResponse)
	.then(parseJson);

export const getQuote = id => fetch(`${host}/api/quote/${id}`)
	.then(handleResponse)
	.then(parseJson);

export const quoteQuote = data => fetch(`${host}/api/quote`, {
	method: 'quote',
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
