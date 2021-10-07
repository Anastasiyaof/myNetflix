import React from 'react';
import './Input.scss';

function isInvalid({ valid, shouldValidate, touched }) {
	return !valid && shouldValidate && touched;
}

export const Input = props => {
	const inputType = props.type || 'text';
	const cls = [];
	const htmlFor = `${inputType}_${Math.random()}`;

	if (isInvalid(props)) {
		cls.push('invalid');
	}

	return (
		<div className={'Input'}>
			<label htmlFor={htmlFor}>{props.label}</label>
			<input
				className={cls.join(' ')}
				type={inputType}
				id={htmlFor}
				value={props.value}
				onChange={props.onChange}
				minLength={props.minLength}
				required={props.required}
			/>
			{isInvalid(props) ? (
				<span>{props.errMessage || 'Incorrect value'}</span>
			) : null}
		</div>
	);
};
