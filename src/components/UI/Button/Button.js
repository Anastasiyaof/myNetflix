import React from 'react';
import './Button.scss';

export const Button = props => {
	const cls = ['btn', props.type];

	if (props.disabled) cls.push('disabled');

	return (
		<button onClick={props.onClick} className={cls.join(' ')}>
			{props.children}
		</button>
	);
};
