import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const Login = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const [form, setForm] = useState({ login: '', password: '' });
	const [error, setError] = useState('');
	const successMessage = location.state?.success || '';

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await api.post('/auth/login-user', form);
			const accessToken = res.data.accessToken;
			const refreshToken = res.data.refreshToken;

			if (!accessToken || !refreshToken) {
				throw new Error('Token missing from response');
			}

			// ✅ Decode to get role
			const decoded = JSON.parse(atob(accessToken.split('.')[1]));
			const roles = decoded.roles || [];
			const role = roles.includes('ROLE_ADMIN') ? 'ADMIN' : 'USER';

			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);
			localStorage.setItem('role', role);

			login({ token: accessToken, role });

			const redirectPath = location?.state?.from?.pathname || '/';
			navigate(redirectPath);
		} catch (err) {
			console.error('❌ Login error:', err);
			setError('Invalid credentials. Please try again.');
		}
	};

	return (
		<div className='d-flex justify-content-center align-items-center vh-100 bg-light'>
			<div
				className='p-4 shadow rounded bg-white'
				style={{ maxWidth: '400px', width: '100%' }}
			>
				<h3 className='text-center mb-3'>Login</h3>

				{successMessage && (
					<div className='alert alert-success'>{successMessage}</div>
				)}
				{error && <div className='alert alert-danger'>{error}</div>}

				<form onSubmit={handleSubmit}>
					<input
						className='form-control my-2'
						type='text'
						name='login'
						placeholder='Username or Email'
						value={form.login}
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
					<button
						className='btn btn-primary w-100'
						type='submit'
					>
						Login
					</button>
				</form>

				<div className='text-center mt-2'>
					<small>
						<Link to='/forgot-password'>Forgot Password?</Link>
					</small>
				</div>

				<div className='text-center mt-3'>
					<small>
						Don't have an account? <Link to='/signup'>Sign up</Link>
					</small>
				</div>
			</div>
		</div>
	);
};

export default Login;
