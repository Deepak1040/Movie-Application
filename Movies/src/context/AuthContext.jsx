import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	// 🔁 Load from localStorage on mount
	useEffect(() => {
		const token = localStorage.getItem('accessToken');
		const role = localStorage.getItem('role');
		if (token && role) {
			setUser({ token, role });
		}
	}, []);

	// ✅ Login and normalize role
	const login = ({ accessToken, refreshToken, role }) => {
		const cleanRole = role?.replace('ROLE_', '').toUpperCase() || 'USER';

		localStorage.setItem('accessToken', accessToken);
		localStorage.setItem('refreshToken', refreshToken);
		localStorage.setItem('role', cleanRole);

		setUser({ token: accessToken, role: cleanRole });
	};

	const logout = () => {
		localStorage.clear();
		setUser(null);
	};

	const isAdmin = user?.role === 'ADMIN';

	return (
		<AuthContext.Provider value={{ user, login, logout, isAdmin }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
