import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
	const { user } = useAuth();
	const [username, setUsername] = useState('');
	const [gmail, setGmail] = useState('');
	const [bio, setBio] = useState('');
	const [favorites, setFavorites] = useState([]);
	const [bookings, setBookings] = useState([]);
	const [message, setMessage] = useState('');

	useEffect(() => {
		if (!user?.token) return;

		const headers = { Authorization: `Bearer ${user.token}` };

		// Fetch user profile
		axios
			.get('http://localhost:8080/api/users/profile', { headers })
			.then((res) => {
				const u = res.data;
				setUsername(u.username);
				setGmail(u.gmail);
				setBio(u.bio || '');
			})
			.catch((err) => console.error('Profile fetch error:', err));

		// Fetch favorite movies
		axios
			.get('http://localhost:8080/api/users/favorites', { headers })
			.then((res) => setFavorites(res.data))
			.catch((err) => console.error('Favorites fetch error:', err));

		// Fetch bookings
		axios
			.get('http://localhost:8080/api/bookings/user', { headers })
			.then((res) => setBookings(res.data))
			.catch((err) => console.error('Bookings fetch error:', err));
	}, [user]);

	const handleBioUpdate = (e) => {
		e.preventDefault();
		axios
			.put(
				'http://localhost:8080/api/users/update-bio',
				{}, // fix: send empty object instead of null
				{
					params: { bio },
					headers: { Authorization: `Bearer ${user.token}` },
				}
			)
			.then(() => setMessage('✅ Bio updated successfully'))
			.catch(() => setMessage('❌ Bio update failed'));
	};

	if (!user) return <p>Please log in to view your profile.</p>;

	return (
		<div className='container mt-4'>
			<h2>👤 Your Profile</h2>
			<p>
				<strong>Username:</strong> {username}
			</p>
			<p>
				<strong>Email:</strong> {gmail}
			</p>

			<form onSubmit={handleBioUpdate}>
				<div className='mb-3'>
					<label className='form-label'>Bio:</label>
					<textarea
						className='form-control'
						value={bio}
						onChange={(e) => setBio(e.target.value)}
						rows='3'
					/>
				</div>
				<button
					type='submit'
					className='btn btn-primary'
				>
					Update Bio
				</button>
				{message && <p className='mt-2 text-info'>{message}</p>}
			</form>

			<hr />

			<h4>❤️ Favorite Movies</h4>
			{favorites.length === 0 ? (
				<p>No favorite movies added yet.</p>
			) : (
				<div className='row'>
					{favorites.map((movie, idx) => (
						<div
							className='col-md-3'
							key={idx}
						>
							<div className='card mb-3'>
								<img
									src={movie.posterUrl || '/placeholder.jpg'}
									className='card-img-top'
									alt={movie.title}
								/>
								<div className='card-body'>
									<h5 className='card-title'>{movie.title}</h5>
								</div>
							</div>
						</div>
					))}
				</div>
			)}

			<hr />

			<h4>🎟️ Bookings</h4>
			{bookings.length === 0 ? (
				<p>No bookings yet.</p>
			) : (
				bookings.map((b) => (
					<div
						className='card mb-3'
						key={b.id}
					>
						<div className='card-body'>
							<h5>{b.movie?.title}</h5>
							<p>
								<strong>Seats:</strong> {b.seatNumbers}
							</p>
							<p>
								<strong>Time:</strong> {b.bookingTime}
							</p>
							<p>
								<strong>Status:</strong> {b.paymentStatus}
							</p>
						</div>
					</div>
				))
			)}
		</div>
	);
};

export default Profile;
