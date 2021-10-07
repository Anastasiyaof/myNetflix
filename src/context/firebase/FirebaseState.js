import axios from 'axios';
import React, { useReducer } from 'react';
import {
	ADD_FAVORITE,
	ADD_FRIEND,
	GET_FAVORITE,
	REMOVE_FAVORITE,
	REMOVE_FRIEND,
	SET_LOADING,
} from '../types';
import { FirebaseContext } from './FirebaseContext';
import { FirebaseReducer } from './FirebaseReducer';

export const FirebaseState = ({ children }) => {
	const initialState = {
		email: '',
		favorites: {},
		friends: [],
		users: [],
	};

	const url = process.env.REACT_APP_DB_URL;

	const [state, dispatch] = useReducer(FirebaseReducer, initialState);
	const { favorites, users, friends } = state;

	const setLoading = () => {
		dispatch({ type: SET_LOADING });
	};

	const getFavorites = async () => {
		setLoading();
		try {
			const response = await axios.get(`${url}.json`);
			dispatch({
				type: GET_FAVORITE,
				payload: response.data,
			});
		} catch (err) {
			console.log(err);
		}
	};

	const addFavorite = async showId => {
		try {
			const response = await axios.post(`${url}/favorites.json`, showId);
			console.log(response.data);
			dispatch({
				type: ADD_FAVORITE,
				payload: [response.data.name, showId],
			});
		} catch (err) {
			console.log(err);
		}
	};

	const removeFavorite = async showKey => {
		try {
			await axios.delete(`${url}/favorites/${showKey}.json`);
			dispatch({
				type: REMOVE_FAVORITE,
				payload: showKey,
			});
		} catch (err) {
			console.log(err);
		}
	};

	const addFriend = async name => {
		try {
			await axios.patch(
				`${url}.json`,
				JSON.stringify({ friends: [...friends, name] })
			);
			await axios.patch(
				`${url}.json`,
				JSON.stringify({ users: users.filter(user => user !== name) })
			);
			dispatch({
				type: ADD_FRIEND,
				payload: name,
			});
		} catch (e) {
			console.log(e);
		}
	};

	const removeFriend = async name => {
		try {
			await axios.patch(
				`${url}.json`,
				JSON.stringify({ friends: friends.filter(user => user !== name) })
			);
			await axios.patch(
				`${url}.json`,
				JSON.stringify({ users: [...users, name] })
			);
			dispatch({
				type: REMOVE_FRIEND,
				payload: name,
			});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<FirebaseContext.Provider
			value={{
				favorites,
				users,
				friends,
				getFavorites,
				addFavorite,
				removeFavorite,
				addFriend,
				removeFriend,
			}}>
			{children}
		</FirebaseContext.Provider>
	);
};
