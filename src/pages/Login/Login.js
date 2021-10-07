import React, { useState } from 'react';
import './Login.scss';
import { Input } from '../../components/UI/Input/Input';
import is from 'is_js';
import axios from 'axios';
import { useAuth } from '../../components/AuthContext';
import { Button } from '../../components/UI/Button/Button';

export default function Login(props) {
	const { setToken } = useAuth();
	const [formControls, setFormControls] = useState({
		email: {
			value: '',
			type: 'email',
			label: 'Email',
			valid: false,
			touched: false,
			validation: {
				required: true,
				email: true,
			},
		},
		password: {
			value: '',
			type: 'password',
			label: 'Password',
			valid: false,
			touched: false,
			validation: {
				required: true,
				minLength: 6,
			},
		},
	});

	const [err, setErr] = useState(false);

	function onChangeHandler(event, controlName) {
		const controls = { ...formControls };
		const control = { ...controls[controlName] };
		control.touched = true;
		control.value = event.target.value;
		control.valid = isInValid(event, controlName);
		controls[controlName] = control;
		setFormControls(controls);
	}

	function isInValid(event, controlName) {
		if (
			event.target.value.trim() === '' ||
			event.target.shouldValidate === false
		) {
			return false;
		}
		const controls = { ...formControls };
		const control = { ...controls[controlName] };
		if (control.validation.email) {
			return is.email(control.value);
		} else {
			return event.target.validity.valid;
		}
	}

	function renderInputs() {
		return Object.keys(formControls).map((controlName, index) => {
			const control = formControls[controlName];
			return (
				<Input
					key={controlName + index}
					type={control.type}
					label={control.label}
					value={control.value}
					valid={control.valid}
					touched={control.touched}
					required={control.validation.required}
					shouldValidate={!!control.validation}
					minLength={control.validation.minLength}
					onChange={event => onChangeHandler(event, controlName)}
				/>
			);
		});
	}

	async function onSubmitHandler(event) {
		event.preventDefault();
		const userData = {
			email: formControls.email.value,
			password: formControls.password.value,
			returnSecureToken: true,
		};
		try {
			const response = await axios.post(
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCpV9fmFCrCCcuMje4QKwSJ-BnVnn8QgE4',
				userData
			);
			setToken(response.data);
		} catch (e) {
			setErr(true);
			setTimeout(() => setErr(false), 4000);
		}
	}

	return (
		<div className='wrapper'>
			<div className='login-wrap'>
				<h1>LOGIN</h1>
				<form>
					{renderInputs()}
					{err ? <span className='err'>Wrong email or password</span> : null}
					<Button
						onClick={event => onSubmitHandler(event)}
						type='submit'
						disabled={
							!(formControls.email.valid && formControls.password.valid)
						}>
						Submit
					</Button>
				</form>
			</div>
		</div>
	);
}
