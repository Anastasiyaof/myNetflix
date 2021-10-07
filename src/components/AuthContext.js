import React, { useContext, useReducer } from 'react';

const AuthContext = React.createContext();

const LOGIN_AUTH = 'logIn';

export const useAuth = () => useContext(AuthContext);

export const reducer = (state, action) => {
	switch (action.type) {
		case LOGIN_AUTH:
			return { ...state, isAuth: isAuth() };
		default:
			return state;
	}
};

const isAuth = () => {
	const expDate = localStorage.getItem('firebaseExpToken');

	if (new Date(expDate) < new Date() || expDate === null) {
		return false;
	}
	return true;
};

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, {
		isAuth: isAuth(),
	});

	const logIn = () => dispatch({ type: LOGIN_AUTH });

	const setToken = response => {
		if (response) {
			const expDate = new Date(
				new Date().getTime() + +response.expiresIn * 1000
			);
			localStorage.setItem('firebaseToken', response.idToken);
			localStorage.setItem('firebaseExpToken', expDate.toString());
			logIn();
		} else {
			localStorage.clear();
		}
	};
	return (
		<AuthContext.Provider
			value={{
				isAuth: state.isAuth,
				logIn,
				setToken,
			}}>
			{children}
		</AuthContext.Provider>
	);
};
