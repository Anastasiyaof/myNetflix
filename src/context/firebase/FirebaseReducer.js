import {
	ADD_FAVORITE,
	ADD_FRIEND,
	GET_FAVORITE,
	REMOVE_FAVORITE,
	REMOVE_FRIEND,
	SET_LOADING,
} from '../types';

const handlers = {
	[GET_FAVORITE]: (state, action) => ({
		...state,
		favorites: action.payload.favorites,
		friends: action.payload.friends,
		users: action.payload.users,
		loading: false,
	}),
	[ADD_FAVORITE]: (state, { payload }) => {
		return {
			...state,
			favorites: { ...state.favorites, [payload[0]]: payload[1] },
			loading: false,
		};
	},
	[REMOVE_FAVORITE]: (state, { payload }) => {
		const clone = { ...state.favorites };
		delete clone[payload];
		return {
			...state,
			favorites: clone,
			loading: false,
		};
	},
	[ADD_FRIEND]: (state, { payload }) => {
		return {
			...state,
			friends: [...state.friends, payload],
			users: state.users.filter(user => user !== payload),
			loading: false,
		};
	},
	[REMOVE_FRIEND]: (state, { payload }) => {
		return {
			...state,
			friends: state.friends.filter(user => user !== payload),
			users: [...state.users, payload],
			loading: false,
		};
	},
	[SET_LOADING]: state => ({
		...state,
		loading: true,
	}),
	DEFAULT: state => state,
};

export const FirebaseReducer = (state, action) => {
	const handler = handlers[action.type] || handlers.DEFAULT;
	return handler(state, action);
};
