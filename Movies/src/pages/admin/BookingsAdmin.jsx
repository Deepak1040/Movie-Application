import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingsAdmin = () => {
	const [bookings, setBookings] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:8080/api/bookings')
			.then((res) => setBookings(res.data))
			.catch((err) => console.error('Failed to fetch bookings', err));
	}, []);

	return (
		<div className='container mt-4'>
			<h3>📋 All Bookings</h3>
			<table className='table table-bordered table-striped'>
				<thead>
					<tr>
						<th>User</th>
						<th>Movie</th>
						<th>Seats</th>
						<th>Date & Time</th>
					</tr>
				</thead>
				<tbody>
					{bookings.map((b) => (
						<tr key={b.id}>
							<td>
								{b.userName} ({b.userEmail})
							</td>
							<td>{b.movieTitle}</td>
							<td>{b.seats.join(', ')}</td>
							<td>
								{b.date} at {b.time}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default BookingsAdmin;
