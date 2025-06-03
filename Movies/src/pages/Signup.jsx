import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';

const Signup = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({ username: '', gmail: '', password: '' });
	const [error, setError] = useState('');

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await registerUser(form); // POST /signup-user
			navigate('/login', {
				state: { success: 'Signup successful. Please login.' },
			});
		} catch (err) {
			console.error(err);
			setError('Signup failed');
		}
	};

	return (
		<div
			className='container mt-5'
			style={{ maxWidth: '400px' }}
		>
			<h3>Signup</h3>
			{error && <div className='alert alert-danger'>{error}</div>}
			<form onSubmit={handleSubmit}>
				<input
					className='form-control my-2'
					type='text'
					name='username'
					placeholder='Name'
					value={form.username}
					onChange={handleChange}
					required
				/>
				<input
					className='form-control my-2'
					type='email'
					name='gmail'
					placeholder='Email'
					value={form.gmail}
					onChange={handleChange}
					required
				/>
				<input
					className='form-control my-2'
					type='password'
					name='password'
					placeholder='Password'
					value={form.password}
					onChange={handleChange}
					required
				/>
				<button className='btn btn-success w-100'>Signup</button>
			</form>
		</div>
	);
};

export default Signup;
