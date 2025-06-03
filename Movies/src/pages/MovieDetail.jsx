import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById } from '../api/movies';

const MovieDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [movie, setMovie] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getMovieById(id)
			.then((res) => {
				setMovie(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.error('Error fetching movie:', err);
				setLoading(false);
			});
	}, [id]);

	if (loading) return <div className='text-center mt-5'>Loading...</div>;
	if (!movie) return <div className='text-center mt-5'>Movie not found.</div>;

	return (
		<div className='container mt-4'>
			<div className='row'>
				<div className='col-md-5'>
					<img
						src={movie.posterUrl}
						alt={movie.title}
						className='img-fluid rounded shadow'
					/>
				</div>
				<div className='col-md-7'>
					<h2>{movie.title}</h2>
					<p>
						<strong>Language:</strong> {movie.language}
					</p>
					<p>
						<strong>Genre:</strong> {movie.genre}
					</p>
					<p>
						<strong>Duration:</strong> {movie.duration} min
					</p>
					<p>
						<strong>Description:</strong>
						<br />
						{movie.description}
					</p>
					<button
						className='btn btn-primary mt-3'
						onClick={() => navigate(`/booking/${movie.id}`)}
					>
						🎟️ Book Now
					</button>
				</div>
			</div>
		</div>
	);
};

export default MovieDetail;
