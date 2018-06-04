import debug from 'debug';

const logName = 'todo action';
const log = {
	trace: debug(`${logName}:trace`),
	debug: debug(`${logName}:debug`),
	log: debug(`${logName}:log`),
	info: debug(`${logName}:info`),
	warn: debug(`${logName}:warn`),
	error: debug(`${logName}:error`)
};

export const SET_TODOS = 'SET_TODOS';
export const SET_TODO = 'SET_TODO';
export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DEL_TODO = 'DEL_TODO';

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

export function setTodos(todos) {
	return { type: SET_TODOS, todos };
}

export function setTodo(todo) {
	return { type: SET_TODO, todo };
}

export function addTodo(todo) {
	return { type: ADD_TODO, todo };
}

export function updateTodo(todo) {
	return { type: UPDATE_TODO, todo };
}

export function delTodo(todo) {
	return { type: DEL_TODO, todo };
}

/**
 * api operation
 */

const host = 'http://localhost:8000';

export function getTodos(data) {
	return fetch(`${host}/api/todo`)
		.then(handleResponse)
		.then(parseJson);
}

export function getTodo(id) {
	return fetch(`${host}/api/todo/${id}`)
		.then(handleResponse)
		.then(parseJson);
}

export function todoTodo(data) {
	return fetch(`${host}/api/todo`, {
		method: 'todo',
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' }
	})
		.then(handleResponse)
		.then(parseJson);
}

export function putTodo(data) {
	return fetch(`${host}/api/todo/${data.id}`, {
		method: 'put',
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' }
	})
		.then(handleResponse)
		.then(parseJson);
}

export function deleteTodo(id) {
	return fetch(`${host}/api/todo/${id}`, {
		method: 'delete',
		headers: { 'Content-Type': 'application/json' }
	})
		.then(handleResponse)
		.then(parseJson);
}
