import React from 'react';
import './Loader.scss';

export const Loader = () => {
	return (
		<div className='lds-grid'>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default Loader;
