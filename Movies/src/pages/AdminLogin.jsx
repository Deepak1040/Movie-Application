import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const AdminLogin = () => {
	const [gmail, setGmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await api.post('/auth/login-admin', { gmail, password });

			const accessToken = res.data.accessToken;
			const refreshToken = res.data.refreshToken;

			if (!accessToken || !refreshToken) {
				throw new Error('Tokens missing from response');
			}

			// ✅ Decode token to get roles
			const decoded = JSON.parse(atob(accessToken.split('.')[1]));
			const roles = decoded.roles || [];
			const role = roles.includes('ROLE_ADMIN') ? 'ADMIN' : 'USER';

			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);
			localStorage.setItem('role', role);

			login({ accessToken, refreshToken, role });

			if (role === 'ADMIN') {
				navigate('/admin/dashboard');
			} else {
				setError('You are not an admin.');
			}
		} catch (err) {
			console.error('❌ Admin login failed:', err);
			setError('Invalid admin credentials. Please try again.');
		}
	};

	return (
		<div className='d-flex justify-content-center align-items-center vh-100 bg-light'>
			<div
				className='p-4 shadow rounded bg-white'
				style={{ maxWidth: '400px', width: '100%' }}
			>
				<h3 className='text-center mb-3'>Admin Login</h3>
				{error && <div className='alert alert-danger'>{error}</div>}
				<form onSubmit={handleLogin}>
					<input
						className='form-control my-2'
						type='email'
						placeholder='Admin Gmail'
						value={gmail}
						onChange={(e) => setGmail(e.target.value)}
						required
					/>
					<input
						className='form-control my-2'
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button
						className='btn btn-dark w-100'
						type='submit'
					>
						Login as Admin
					</button>
				</form>
			</div>
		</div>
	);
};

export default AdminLogin;
