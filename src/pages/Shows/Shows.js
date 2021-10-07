import React, { useContext, useEffect, useState } from 'react';
import { ShowList } from '../../components/ShowList/ShowList';
import { TVapiContext } from '../../context/tvapi/TVapiContext';
import Loader from '../../components/UI/Loader/Loader';
import { genres, types } from '../consts';
import './Show.scss';
import { FirebaseContext } from '../../context/firebase/FirebaseContext';

export default function Shows() {
	const [page] = useState(1);
	const [top, setTop] = useState([]);
	const [suggestions, setSuggestions] = useState([]);
	const [filters, setFilters] = useState({
		genre: [],
		type: '',
		sort: '',
	});
	const { getShows, filterBy, shows, filteredShows } = useContext(TVapiContext);

	const { getFavorites } = useContext(FirebaseContext);

	useEffect(() => {
		const get = async () => await getShows();
		get();
	}, [page]);
	useEffect(() => {
		const get = async () => await getFavorites();
		get();
	}, [page]);
	useEffect(() => setTop(getTop()), [shows]);
	useEffect(() => setSuggestions(getSuggestions()), [shows]);
	useEffect(() => filterBy(filters), [filters]);

	function getTop() {
		return [...shows]
			.sort((item1, item2) => item2.rating - item1.rating)
			.slice(0, 10);
	}

	function getSuggestions() {
		if (shows.length === 0) {
			return;
		}
		const numbers = [];
		const topIds = top.map(show => show.id);
		while (numbers.length < 10) {
			let max = shows.length - 1;
			let n = Math.floor(1 + Math.random() * max);
			if (!numbers.includes(n) && !topIds.includes()) {
				numbers.push(n);
			}
		}
		return numbers.map((item, index) => shows[index]);
	}

	const filterHandler = ({ target }) => {
		const by = target.name;
		const clone = { ...filters };
		if (by === 'sort' || by === 'type') {
			clone[by] = target.value;
		} else if (target.checked) {
			clone[by].push(target.value);
		} else {
			clone[by] = clone[by].filter(item => item !== target.value);
		}
		setFilters(clone);
	};

	return (
		<>
			{top.length === 0 || suggestions.length === 0 ? (
				<Loader />
			) : (
				<>
					<h2>Top 10</h2>
					<div className={'list-wrap'}>
						<ShowList className={'show-item'} arr={top} />
					</div>
					{top.length > 0 ? (
						<>
							<h2>Suggestions</h2>
							<div className={'list-wrap'}>
								<ShowList className={'show-item'} arr={suggestions} />
							</div>
						</>
					) : null}

					<div className='block'>
						<h1>Shows</h1>
						<form className={'filter'} onChange={e => filterHandler(e)}>
							<h4>Genres</h4>
							<div className={'genre field'}>
								{genres.map((genre, index) => {
									return (
										<label key={index}>
											<input type='checkbox' value={genre} name='genre' />
											{genre}
										</label>
									);
								})}
							</div>
							<div className={'filter-part'}>
								<h4>Type</h4>
								<div className={'type field'}>
									{types.map((type, index) => {
										return (
											<label key={index}>
												<input type='radio' value={type} name='type' />
												{type}
											</label>
										);
									})}
								</div>
							</div>
							<div className={'filter-part'}>
								<h4>Sort</h4>
								<div className={'sort field'}>
									<label>
										<input type='radio' value={'highest'} name='sort' />
										Highest rating
									</label>
									<label>
										<input type='radio' value={'lowest'} name='sort' />
										Lowest rating
									</label>
								</div>
							</div>
						</form>
						<div className={'shows-wrap'}>
							<ShowList
								className={'show-card'}
								arr={filteredShows}
								card={true}
							/>
						</div>
					</div>
				</>
			)}
		</>
	);
}
