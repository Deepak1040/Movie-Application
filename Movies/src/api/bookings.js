import axios from 'axios';

export const getSeats = (movieId, showTime) =>
	axios.get(`/api/bookings/seats?movieId=${movieId}&showTime=${showTime}`);

export const bookSeats = (bookingData) =>
	axios.post('/api/bookings', bookingData);

export const getUserBookings = () => axios.get('/api/bookings/user');

export const getAllBookings = () => axios.get('/api/bookings');
