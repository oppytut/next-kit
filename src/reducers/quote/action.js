import debug from 'debug';

const logName = 'quote action';
const log = {
	trace: debug(`${logName}:trace`),
	debug: debug(`${logName}:debug`),
	log: debug(`${logName}:log`),
	info: debug(`${logName}:info`),
	warn: debug(`${logName}:warn`),
	error: debug(`${logName}:error`)
};

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
 * reducer operation
 */

export function setQuotes(quotes) {
	return { type: SET_QUOTES, quotes };
}

export function setQuote(quote) {
	return { type: SET_QUOTE, quote };
}

export function addQuote(quote) {
	return { type: ADD_QUOTE, quote };
}

export function updateQuote(quote) {
	return { type: UPDATE_QUOTE, quote };
}

export function delQuote(quote) {
	return { type: DEL_QUOTE, quote };
}

/**
 * api operation
 */

const host = 'http://localhost:8000';

export function getQuotes(data) {
	return fetch(`${host}/api/quote`)
		.then(handleResponse)
		.then(parseJson);
}

export function getQuote(id) {
	return fetch(`${host}/api/quote/${id}`)
		.then(handleResponse)
		.then(parseJson);
}

export function quoteQuote(data) {
	return fetch(`${host}/api/quote`, {
		method: 'quote',
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' }
	})
		.then(handleResponse)
		.then(parseJson);
}

export function putQuote(data) {
	return fetch(`${host}/api/quote/${data.id}`, {
		method: 'put',
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' }
	})
		.then(handleResponse)
		.then(parseJson);
}

export function deleteQuote(id) {
	return fetch(`${host}/api/quote/${id}`, {
		method: 'delete',
		headers: { 'Content-Type': 'application/json' }
	})
		.then(handleResponse)
		.then(parseJson);
}
