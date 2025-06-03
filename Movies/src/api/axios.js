import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:8080/api',
});

// ✅ Automatically attach token if present
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('accessToken');

		if (token && token.split('.').length === 3) {
			config.headers.Authorization = `Bearer ${token}`;
			console.log('🔐 Axios: token attached.');
		} else {
			console.warn('⚠️ Axios: no valid token found.');
		}

		return config;
	},
	(error) => Promise.reject(error)
);

// ✅ Auto-refresh token on 403 errors
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 403 && !originalRequest._retry) {
			originalRequest._retry = true;

			const refreshToken = localStorage.getItem('refreshToken');

			try {
				const res = await axios.post('http://localhost:8080/api/auth/refresh', {
					refreshToken,
				});

				const { accessToken, refreshToken: newRefreshToken } = res.data;

				// Store new tokens
				localStorage.setItem('accessToken', accessToken);
				localStorage.setItem('refreshToken', newRefreshToken);

				// Retry the original request with new token
				api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
				originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

				return api(originalRequest);
			} catch (refreshErr) {
				console.error('🔁 Token refresh failed:', refreshErr);
				localStorage.clear();
				window.location.href = '/login'; // force logout
			}
		}

		return Promise.reject(error);
	}
);

export default api;
