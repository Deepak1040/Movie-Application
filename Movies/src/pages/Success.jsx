import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Success = () => {
	const location = useLocation();
	const seats = location.state?.seats || [];

	return (
		<div className='container mt-5 text-center'>
			<h2>✅ Booking Confirmed!</h2>
			<p>Enjoy your movie 🎬</p>
			<p>
				Seats Booked: <strong>{seats.join(', ')}</strong>
			</p>
			<Link
				to='/profile'
				className='btn btn-outline-primary mt-3'
			>
				Go to Profile
			</Link>
		</div>
	);
};

export default Success;
