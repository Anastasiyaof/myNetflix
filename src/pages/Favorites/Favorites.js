import React, { useContext, useEffect, useState } from 'react';
import { ShowList } from '../../components/ShowList/ShowList';
import { FirebaseContext } from '../../context/firebase/FirebaseContext';
import { TVapiContext } from '../../context/tvapi/TVapiContext';
import './Favorites.scss';

export default function Favorites() {
	const { favorites, getFavorites } = useContext(FirebaseContext);
	const { shows, getShows } = useContext(TVapiContext);

	const [share, setShare] = useState(false);
	useEffect(() => {
		const get = async () => {
			await getShows();
			await getFavorites();
		};
		get();
	}, []);

	const ids = Object.values(favorites);
	const favoritesShows = shows.filter(show => {
		return ids.includes(show.id);
	});
	return (
		<>
			<div className='header-block'>
				<h1>My favorite shows</h1>

				<button
					onClick={() => {
						setShare(true);
						setTimeout(() => setShare(false), 1500);
						console.log(favoritesShows);
					}}>
					Share my list
				</button>
				{share ? <span className='span'>Copied</span> : null}
			</div>
			<div className={'shows-wrap'}>
				{favoritesShows.length > 0 ? (
					<ShowList className={'show-card'} arr={favoritesShows} card={true} />
				) : (
					<h2>Sorry, you don`t have any favorite shows</h2>
				)}
			</div>
		</>
	);
}
