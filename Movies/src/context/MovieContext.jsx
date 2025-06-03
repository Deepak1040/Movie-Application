// src/context/MovieContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { getAllMovies } from '../api/movies';

export const MovieContext = createContext();

const MovieProvider = ({ children }) => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchMovies = async () => {
		try {
			const res = await getAllMovies();
			setMovies(res.data);
			setLoading(false);
		} catch (err) {
			console.error('Failed to fetch movies', err);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMovies();
	}, []);

	return (
		<MovieContext.Provider value={{ movies, loading, fetchMovies }}>
			{children}
		</MovieContext.Provider>
	);
};

export default MovieProvider;
