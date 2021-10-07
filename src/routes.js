import Favorites from './pages/Favorites/Favorites';
import Friends from './pages/Friends/Friends';
import Login from './pages/Login/Login';
import Shows from './pages/Shows/Shows';
import {
	FAVORITES_ROUTE,
	FRIENDS_ROUTE,
	LOGIN_ROUTE,
	SHOWS_ROUTE,
} from './utils/consts';

export const authRoutes = [
	{
		path: SHOWS_ROUTE,
		Component: Shows,
	},
	{
		path: FAVORITES_ROUTE,
		Component: Favorites,
	},
	{
		path: FRIENDS_ROUTE,
		Component: Friends,
	},
];

export const publicRoutes = [
	{
		path: LOGIN_ROUTE,
		Component: Login,
	},
];
