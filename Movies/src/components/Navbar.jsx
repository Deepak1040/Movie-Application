import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/');
	};

	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark px-4'>
			<Link
				className='navbar-brand'
				to='/'
			>
				🎬 MovieBook
			</Link>

			<div className='collapse navbar-collapse'>
				<ul className='navbar-nav me-auto'>
					<li className='nav-item'>
						<Link
							className='nav-link'
							to='/'
						>
							Home
						</Link>
					</li>
					<li className='nav-item'>
						<Link
							className='nav-link'
							to='/movies'
						>
							Movies
						</Link>
					</li>
					{user?.role === 'admin' && (
						<li className='nav-item'>
							<Link
								className='nav-link'
								to='/admin'
							>
								Admin Panel
							</Link>
						</li>
					)}
				</ul>

				<ul className='navbar-nav ms-auto'>
					{!user && (
						<>
							<li className='nav-item'>
								<Link
									className='nav-link'
									to='/login'
								>
									Login
								</Link>
							</li>
							<li className='nav-item'>
								<Link
									className='nav-link'
									to='/signup'
								>
									Signup
								</Link>
							</li>
						</>
					)}

					{user && (
						<>
							<li className='nav-item'>
								<Link
									className='nav-link'
									to='/profile'
								>
									👤 {user.name}
								</Link>
							</li>
							<li className='nav-item'>
								<button
									className='btn btn-outline-light btn-sm ms-2'
									onClick={handleLogout}
								>
									Logout
								</button>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
