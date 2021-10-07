import axios from 'axios';
import React, { useReducer } from 'react';
import { SET_SHOWS, SET_LOADING, SET_FILTERED } from '../types';
import { TVapiContext } from './TVapiContext';
import { TVapiReducer } from './TVapiReducer';

export const TVapiState = ({ children }) => {
	const initialState = {
		shows: [],
		filteredShows: [],
		loading: true,
	};

	const [state, dispatch] = useReducer(TVapiReducer, initialState);
	const { shows, loading, filteredShows } = state;

	const setLoading = () => {
		dispatch({ type: SET_LOADING });
	};

	const getShows = async () => {
		setLoading();
		try {
			const response = await axios.get('https://api.tvmaze.com/shows');
			let shortResponse = response.data.slice(0, 36).map(show => {
				return {
					id: show.id,
					name: show.name,
					type: show.type,
					genres: show.genres,
					rating: show.rating.average,
					image: show.image,
					summary: show.summary,
				};
			});

			dispatch({
				type: SET_SHOWS,
				payload: shortResponse,
			});
		} catch (err) {
			console.log(err);
		}
	};

	const filterBy = filters => {
		setLoading();
		let clone = [...shows].filter(show => {
			let include = true;
			if (filters.genre.length > 0) {
				filters.genre.forEach(item => {
					include = show.genres.includes(item);
				});
			}
			return include;
		});
		clone = clone.filter(show => {
			let include = true;
			if (filters.type) {
				include = show.type === filters.type;
			}
			return include;
		});

		if (filters.sort === 'highest') {
			clone.sort(
				(show1, show2) => parseFloat(show2.rating) - parseFloat(show1.rating)
			);
		}
		if (filters.sort === 'lowest') {
			clone.sort(
				(show1, show2) => parseFloat(show1.rating) - parseFloat(show2.rating)
			);
		}

		dispatch({
			type: SET_FILTERED,
			payload: clone,
		});
	};

	return (
		<TVapiContext.Provider
			value={{
				getShows,
				filteredShows,
				filterBy,
				shows,
				loading,
			}}>
			{children}
		</TVapiContext.Provider>
	);
};
