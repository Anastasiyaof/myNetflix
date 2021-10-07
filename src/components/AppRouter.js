import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { authRoutes, publicRoutes } from '../routes';
import { LOGIN_ROUTE, SHOWS_ROUTE } from '../utils/consts';
import { useAuth } from './AuthContext';

export const AppRouter = () => {
	const { isAuth } = useAuth();
	return (
		<Switch>
			{isAuth
				? authRoutes.map(({ path, Component }) => (
						<Route key={path} path={path} component={Component} exact />
				  ))
				: publicRoutes.map(({ path, Component }) => (
						<Route key={path} path={path} component={Component} exact />
				  ))}
			{isAuth ? <Redirect to={SHOWS_ROUTE} /> : <Redirect to={LOGIN_ROUTE} />}
		</Switch>
	);
};

export default AppRouter;
