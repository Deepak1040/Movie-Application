import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
	const [step, setStep] = useState(1); // 1 = email, 2 = otp, 3 = success
	const [email, setEmail] = useState('');
	const [otp, setOtp] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const sendOtp = async (e) => {
		e.preventDefault();
		try {
			await axios.post(
				`http://localhost:8080/api/auth/send-otp?gmail=${email}`
			);
			setMessage('OTP sent to your email. Please check your inbox.');
			setError('');
			setStep(2);
		} catch (err) {
			setError('Failed to send OTP. Check the email and try again.');
			setMessage('');
		}
	};

	const handleReset = async (e) => {
		e.preventDefault();
		try {
			await axios.post('http://localhost:8080/api/auth/verify-otp-and-reset', {
				email,
				otp,
				newPassword,
			});
			setMessage('Password reset successful. Redirecting to login...');
			setError('');
			setStep(3);
			setTimeout(
				() =>
					navigate('/login', {
						state: { success: 'Password reset successfully. Please login.' },
					}),
				2500
			);
		} catch (err) {
			setError('Invalid OTP or reset failed.');
			setMessage('');
		}
	};

	return (
		<div className='d-flex justify-content-center align-items-center vh-100 bg-light'>
			<div
				className='p-4 shadow rounded bg-white'
				style={{ maxWidth: '400px', width: '100%' }}
			>
				<h4 className='text-center mb-3'>Forgot Password</h4>

				{message && <div className='alert alert-success'>{message}</div>}
				{error && <div className='alert alert-danger'>{error}</div>}

				{step === 1 && (
					<form onSubmit={sendOtp}>
						<input
							type='email'
							className='form-control mb-3'
							placeholder='Enter your registered email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<button
							className='btn btn-primary w-100'
							type='submit'
						>
							Send OTP
						</button>
					</form>
				)}

				{step === 2 && (
					<form onSubmit={handleReset}>
						<input
							type='text'
							className='form-control mb-2'
							placeholder='Enter OTP'
							value={otp}
							onChange={(e) => setOtp(e.target.value)}
							required
						/>
						<input
							type='password'
							className='form-control mb-3'
							placeholder='Enter New Password'
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							required
						/>
						<button
							className='btn btn-success w-100'
							type='submit'
						>
							Reset Password
						</button>
					</form>
				)}

				{step === 3 && (
					<div className='text-center mt-3'>
						<p>Password reset complete. Redirecting to login...</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default ForgotPassword;
