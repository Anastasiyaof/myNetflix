import { SET_SHOWS, SET_LOADING, SET_FILTERED } from '../types';

const handlers = {
	[SET_SHOWS]: (state, action) => ({
		...state,
		shows: action.payload,
		filteredShows: action.payload,
		loading: false,
	}),
	[SET_FILTERED]: (state, action) => {
		return {
			...state,
			filteredShows: action.payload,
			loading: false,
		};
	},
	[SET_LOADING]: state => ({
		...state,
		loading: true,
	}),
	DEFAULT: state => state,
};

export const TVapiReducer = (state, action) => {
	const handler = handlers[action.type] || handlers.DEFAULT;
	return handler(state, action);
};
