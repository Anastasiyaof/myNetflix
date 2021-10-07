import React from 'react';
import logo from '../../Netflix-Logo-PNG.png';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Nav.scss';

export const Nav = () => {
	const links = [
		{ to: '/shows', label: 'Главная', exact: true },
		{ to: '/favorites', label: 'Избранное', exact: true },
		{ to: '/friends', label: 'Друзья', exact: true },
	];

	const { isAuth } = useAuth();

	return (
		<header>
			<div className={'logo-wrap'}>
				<NavLink to={'/shows'} exact>
					<img src={logo} alt='logo' className={'logo'} />
				</NavLink>
			</div>
			{isAuth ? (
				<nav>
					{links.map((link, index) => {
						return (
							<li key={index}>
								<NavLink to={link.to} exact={link.exact}>
									{link.label}
								</NavLink>
							</li>
						);
					})}
				</nav>
			) : null}
		</header>
	);
};
