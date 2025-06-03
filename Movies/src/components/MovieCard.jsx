import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/MovieCard.css';

const MovieCard = ({ movie }) => {
	return (
		<div className='col-md-4 mb-4'>
			<div className='card h-100 shadow-sm movie-card'>
				<img
					src={
						movie.imageUrl ||
						'https://via.placeholder.com/400x250?text=No+Poster'
					}
					className='card-img-top'
					alt={movie.title}
				/>
				<div className='card-body'>
					<h5 className='card-title'>{movie.title}</h5>
					<p className='card-text text-muted'>{movie.language}</p>
					<p className='card-text small'>
						{movie.description?.slice(0, 80)}...
					</p>
					<Link
						to={`/movie/${movie.id}`}
						className='btn btn-primary btn-sm mt-2'
					>
						View Details
					</Link>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
