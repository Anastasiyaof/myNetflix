import React, { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from '../../context/firebase/FirebaseContext';
import './Friends.scss';

export default function Friends() {
	const { friends, users, addFriend, removeFriend, getFavorites } =
		useContext(FirebaseContext);
	const [search, setSearch] = useState([]);

	useEffect(() => getFavorites(), [search]);

	const onSearchHandler = ({ target }) => {
		if (target.value.trim()) {
			setSearch(
				users.filter(
					user => user.toLowerCase().indexOf(target.value.toLowerCase()) !== -1
				)
			);
		} else {
			setSearch([]);
		}
	};

	return (
		<div>
			<div className='search'>
				<h3>Search</h3>
				<input type='text' onChange={onSearchHandler} />
			</div>

			{search.map((friend, index) => {
				return (
					<div className='friend' key={index}>
						<h3>{friend}</h3>
						<button
							onClick={async () => {
								await addFriend(friend);
								setSearch(search.filter(user => user !== friend));
							}}>
							Add
						</button>
					</div>
				);
			})}
			<h1>My Friends</h1>
			<div className='friends-block'>
				{friends.length > 0 ? (
					friends.map((friend, index) => (
						<div className='friend' key={index}>
							<h3>{friend}</h3>
							<button
								onClick={() => {
									removeFriend(friend);
								}}>
								Remove
							</button>
						</div>
					))
				) : (
					<h3>Sorry, you don`t have friends yet</h3>
				)}
			</div>
		</div>
	);
}
