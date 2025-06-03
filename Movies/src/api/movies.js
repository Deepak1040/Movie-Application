import axiosAuth from './axiosAuth';

export const addMovie = (movie) => axiosAuth.post('/api/movies', movie);
export const getMovieById = (id) => axiosAuth.get(`/api/movies/${id}`);
export const updateMovie = (id, movie) =>
	axiosAuth.put(`/api/movies/${id}`, movie);
export const deleteMovie = (id) => axiosAuth.delete(`/api/movies/${id}`);
export const getAllMovies = () => axiosAuth.get('/api/movies');
