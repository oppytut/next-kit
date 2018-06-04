import {
	SET_TODOS,
	SET_TODO,
	ADD_TODO,
	UPDATE_TODO,
	DEL_TODO
} from './action';

export default function todoReducer(state = [], action = {}) {
	switch (action.type) {
	case SET_TODOS:
		return action.todos;

	case SET_TODO:
		return action.todo;

	case ADD_TODO:
		return [...state, action.todo];

	case UPDATE_TODO:
		return state.map((item) => {
			if(item.id === action.todo.id) {
				return action.todo;
			}
			return item;
		});

	case DEL_TODO:
		return state.filter(item => item.id !== action.todo.id);

	default:
		return state;
	}
}
