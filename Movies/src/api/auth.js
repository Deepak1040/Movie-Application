import axios from 'axios';

// axios instance to the auth backend
const API = axios.create({
	baseURL: 'http://localhost:8080/api/auth',
});

// User login
export const loginUser = async (credentials) => {
	const res = await API.post('/login-user', credentials);
	return res.data;
};

// User signup
export const registerUser = async (userData) => {
	const res = await API.post('/signup-user', userData);
	return res.data;
};

// Admin login
export const loginAdmin = async (credentials) => {
	const res = await API.post('/login-admin', credentials);
	return res.data;
};
