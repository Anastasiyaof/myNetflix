import React from 'react';
import './Main.scss';
import { useAuth } from '../AuthContext';

export const Main = ({ children }) => {
	const { isAuth } = useAuth();

	return (
		<>
			{isAuth ? (
				<div className={'container bg'}>
					<main>{children}</main>
				</div>
			) : (
				children
			)}
		</>
	);
};
