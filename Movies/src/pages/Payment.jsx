import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const seats = location.state?.seats || [];

	const handlePayment = () => {
		// Simulate payment process
		alert('Payment Successful!');
		navigate('/success', { state: { seats } });
	};

	return (
		<div className='container mt-5 text-center'>
			<h3>💳 Payment</h3>
			<p>
				Selected Seats: <strong>{seats.join(', ')}</strong>
			</p>
			<p>Total: ₹{seats.length * 150}</p>
			<button
				className='btn btn-success mt-3'
				onClick={handlePayment}
			>
				Pay Now
			</button>
		</div>
	);
};

export default Payment;
