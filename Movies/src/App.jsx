import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Public Pages
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';
import ForgotPassword from './pages/ForgotPassword';
import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';

// User Protected Pages
import Profile from './pages/Profile';
import Booking from './pages/Booking';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import MoviesAdmin from './pages/admin/MoviesAdmin';
import BookingsAdmin from './pages/admin/BookingsAdmin';
import MovieForm from './pages/admin/MovieForm';
import TheatersAdmin from './pages/admin/TheatersAdmin';

// Route Protection
import ProtectedRoute from './components/ProtectedRoute';

function App() {
	return (
		<>
			<Navbar />

			<Routes>
				{/* 🌐 Public Pages */}
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/movies'
					element={<Movies />}
				/>
				<Route
					path='/movie/:id'
					element={<MovieDetail />}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/signup'
					element={<Signup />}
				/>
				<Route
					path='/about'
					element={<About />}
				/>
				<Route
					path='/contact'
					element={<Contact />}
				/>
				<Route
					path='/forgot-password'
					element={<ForgotPassword />}
				/>

				{/* ✅ FIX: Admin Login/Signup Routes should be clear */}
				<Route
					path='/admin'
					element={<AdminLogin />}
				/>
				<Route
					path='/admin-signup'
					element={<AdminSignup />}
				/>

				{/* 👤 Protected User Pages */}
				<Route
					path='/profile'
					element={
						<ProtectedRoute>
							<Profile />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/book/:id'
					element={
						<ProtectedRoute>
							<Booking />
						</ProtectedRoute>
					}
				/>

				{/* 🛡️ Admin Pages (Protected) */}
				<Route
					path='/admin/dashboard'
					element={
						<ProtectedRoute adminOnly>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/admin/movies'
					element={
						<ProtectedRoute adminOnly>
							<MoviesAdmin />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/admin/bookings'
					element={
						<ProtectedRoute adminOnly>
							<BookingsAdmin />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/admin/theaters'
					element={
						<ProtectedRoute adminOnly>
							<TheatersAdmin />
						</ProtectedRoute>
					}
				/>

				<Route
					path='/admin/movies/add'
					element={
						<ProtectedRoute adminOnly>
							<MovieForm />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/admin/movies/edit/:id'
					element={
						<ProtectedRoute adminOnly>
							<MovieForm />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
