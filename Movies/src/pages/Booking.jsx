import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/Booking.css';

const seatsArray = Array.from({ length: 40 }, (_, i) => `A${i + 1}`);

const Booking = () => {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);
	const [selectedSeats, setSelectedSeats] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`http://localhost:8080/api/movies/${id}`)
			.then((res) => setMovie(res.data));
	}, [id]);

	const toggleSeat = (seat) => {
		setSelectedSeats((prev) =>
			prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
		);
	};

	const handleBooking = () => {
		axios
			.post('http://localhost:8080/api/bookings', {
				movieId: movie.id,
				seats: selectedSeats,
			})
			.then(() => {
				alert('Booking successful!');
				navigate('/profile');
			});
	};

	if (!movie) return <div className='text-center mt-5'>Loading movie...</div>;

	return (
		<div className='container mt-4'>
			<h3>
				🎟️ Book Tickets for <span className='text-primary'>{movie.title}</span>
			</h3>
			<p>
				{movie.language} | Duration: {movie.duration || '2h'}
			</p>

			<div className='seats-grid my-4'>
				{seatsArray.map((seat) => (
					<button
						key={seat}
						className={`seat ${selectedSeats.includes(seat) ? 'selected' : ''}`}
						onClick={() => toggleSeat(seat)}
					>
						{seat}
					</button>
				))}
			</div>

			<div className='my-3'>
				<strong>Selected:</strong> {selectedSeats.join(', ') || 'None'} <br />
				<strong>Total:</strong> ₹{selectedSeats.length * 150}
			</div>

			<button
				className='btn btn-success'
				disabled={selectedSeats.length === 0}
				onClick={handleBooking}
			>
				Pay & Confirm
			</button>
		</div>
	);
};

export default Booking;
