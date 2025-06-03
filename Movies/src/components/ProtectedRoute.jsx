import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
	const { user } = useAuth();
	const location = useLocation();

	// ✅ Get token and role from context or fallback to localStorage
	const token = user?.token || localStorage.getItem('accessToken');
	const role = user?.role || localStorage.getItem('role');

	// 🔍 Debug logs (remove after testing)
	console.log('🛡️ ProtectedRoute: token =', token);
	console.log('🛡️ ProtectedRoute: role =', role);
	console.log('🛡️ ProtectedRoute: adminOnly =', adminOnly);

	// 🔐 No token? Redirect to appropriate login
	if (!token) {
		return (
			<Navigate
				to={adminOnly ? '/admin' : '/login'}
				state={{ from: location }}
				replace
			/>
		);
	}

	// 🛑 Not admin but trying to access admin-only route
	if (adminOnly && role !== 'ADMIN') {
		return (
			<Navigate
				to='/'
				replace
			/>
		);
	}

	// ✅ All checks passed
	return children;
};

export default ProtectedRoute;
