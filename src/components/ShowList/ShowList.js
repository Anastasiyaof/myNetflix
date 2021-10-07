import { useContext } from 'react';
import { FirebaseContext } from '../../context/firebase/FirebaseContext';
import { Link } from 'react-scroll';
import './ShowList.scss';

export const ShowList = props => {
	const { favorites, addFavorite, removeFavorite } =
		useContext(FirebaseContext);
	const iconClass = ['fa-heart'];

	const inFavorites = id => {
		let ids = Object.values(favorites);
		if (ids.includes(id)) {
			return [...iconClass, 'fas', 'favorite'].join(' ');
		}
		return [...iconClass, 'far'].join(' ');
	};

	const onClickHandler = id => {
		const ids = Object.values(favorites);
		if (ids.includes(id)) {
			const entries = Object.entries(favorites);
			const index = ids.indexOf(id);
			removeFavorite(entries[index][0]);
		} else {
			addFavorite(id);
		}
	};

	return props.arr.map((show, index) => (
		<div className={props.className} key={index}>
			{props.card ? (
				<img src={show.image.medium} alt={show.name} />
			) : (
				<Link
					to={show.name}
					spy={true}
					smooth={true}
					offset={-70}
					duration={700}>
					<img src={show.image.medium} alt={show.name} />
				</Link>
			)}
			{props.card ? (
				<div className={'info'} id={show.name}>
					<h4>{show.name}</h4>
					<h5>{show.type}</h5>
					<p>Genres: {show.genres.join(', ')}</p>
					<div className={'score-block'}>
						<span className='icon' onClick={() => onClickHandler(show.id)}>
							<i className={inFavorites(show.id)}></i>
						</span>
						<span>{show.rating}</span>
					</div>
				</div>
			) : null}
		</div>
	));
};
