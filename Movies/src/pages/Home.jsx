import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Home.css'; // optional custom style

const movies = [
	{
		id: 1,
		title: 'The Batman',
		poster: 'https://image.tmdb.org/t/p/w300/74xTEgt7R36Fpooo50r9T25onhq.jpg',
	},
	{
		id: 2,
		title: 'Interstellar',
		poster: 'https://image.tmdb.org/t/p/w300/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
	},
	{
		id: 3,
		title: 'Inception',
		poster: 'https://image.tmdb.org/t/p/w300/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',
	},
];

const Home = () => {
	return (
		<div className='container mt-4'>
			<div className='text-center mb-4'>
				<h2>🎉 Welcome to MovieZone</h2>
				<p>Book your favorite movies now!</p>
			</div>

			<div className='row'>
				{movies.map((movie) => (
					<div
						className='col-md-4 mb-4'
						key={movie.id}
					>
						<div className='card h-100 shadow-sm'>
							<img
								src={movie.poster}
								className='card-img-top'
								alt={movie.title}
							/>
							<div className='card-body text-center'>
								<h5 className='card-title'>{movie.title}</h5>
								<Link
									to={`/movie/${movie.id}`}
									className='btn btn-primary'
								>
									Book Now
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
