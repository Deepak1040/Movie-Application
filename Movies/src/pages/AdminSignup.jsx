import React, { useState } from 'react';

const AdminSignup = () => {
	const [gmail, setGmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	const handleSignup = async (e) => {
		e.preventDefault();
		setError('');
		setMessage('');

		try {
			const response = await fetch(
				'http://localhost:8080/api/auth/signup-admin',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ gmail, password }),
				}
			);

			if (!response.ok) {
				const res = await response.text();
				throw new Error(res || 'Signup failed');
			}

			setMessage('Admin registered successfully. You can now log in.');
			setGmail('');
			setPassword('');
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className='d-flex justify-content-center align-items-center vh-100'>
			<div
				className='card p-4 shadow'
				style={{ width: '350px' }}
			>
				<h4 className='text-center mb-3'>Admin Signup</h4>

				{message && <div className='alert alert-success'>{message}</div>}
				{error && <div className='alert alert-danger'>{error}</div>}

				<form onSubmit={handleSignup}>
					<input
						type='email'
						className='form-control mb-3'
						placeholder='Admin Email'
						value={gmail}
						onChange={(e) => setGmail(e.target.value)}
						required
					/>
					<input
						type='password'
						className='form-control mb-3'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button className='btn btn-dark w-100'>Signup as Admin</button>
				</form>
			</div>
		</div>
	);
};

export default AdminSignup;
