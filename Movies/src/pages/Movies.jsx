// src/pages/admin/MoviesAdmin.jsx
import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Button, Form, Modal, Table } from 'react-bootstrap';

const MoviesAdmin = () => {
	const [movies, setMovies] = useState([]);
	const [theaters, setTheaters] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [editingMovie, setEditingMovie] = useState(null);
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		cast: '',
		castImageUrl: '',
		genre: '',
		language: '',
		rating: '',
		posterUrl: '',
		timing: '',
		theaterId: '',
	});

	const fetchMovies = async () => {
		try {
			const res = await axios.get('/movies');
			setMovies(res.data);
		} catch (error) {
			console.error('Error fetching movies', error);
		}
	};

	const fetchTheaters = async () => {
		try {
			const res = await axios.get('/theaters');
			setTheaters(res.data);
		} catch (error) {
			console.error('Error fetching theaters', error);
		}
	};

	useEffect(() => {
		fetchMovies();
		fetchTheaters();
	}, []);

	const openModal = (movie = null) => {
		setEditingMovie(movie);
		if (movie) {
			setFormData({
				...movie,
				cast: movie.cast.join(', '),
				castImageUrl: movie.castImageUrl.join(', '),
				genre: movie.genre.join(', '),
				language: movie.language.join(', '),
				timing: movie.timing.join(', '),
				theaterId: movie.theater.id,
			});
		} else {
			setFormData({
				name: '',
				description: '',
				cast: '',
				castImageUrl: '',
				genre: '',
				language: '',
				rating: '',
				posterUrl: '',
				timing: '',
				theaterId: '',
			});
		}
		setShowModal(true);
	};

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const saveMovie = async () => {
		const moviePayload = {
			...formData,
			cast: formData.cast.split(',').map((s) => s.trim()),
			castImageUrl: formData.castImageUrl.split(',').map((s) => s.trim()),
			genre: formData.genre.split(',').map((s) => s.trim()),
			language: formData.language.split(',').map((s) => s.trim()),
			timing: formData.timing.split(',').map((s) => s.trim()),
			theaterId: parseInt(formData.theaterId),
		};

		try {
			if (editingMovie) {
				await axios.put(`/movies/${editingMovie.id}`, moviePayload);
			} else {
				await axios.post('/movies', moviePayload);
			}
			setShowModal(false);
			fetchMovies();
		} catch (error) {
			console.error(
				'Error saving movie',
				error.response?.data || error.message
			);
			alert('Failed to save movie: ' + (error.response?.data || error.message));
		}
	};

	const deleteMovie = async (id) => {
		if (window.confirm('Are you sure you want to delete this movie?')) {
			try {
				await axios.delete(`/movies/${id}`);
				fetchMovies();
			} catch (error) {
				alert('Failed to delete movie');
			}
		}
	};

	return (
		<div className='container mt-5'>
			<h2>Manage Movies</h2>
			<Button
				onClick={() => openModal()}
				className='mb-3'
			>
				Add Movie
			</Button>
			<Table
				striped
				bordered
				hover
			>
				<thead>
					<tr>
						<th>Name</th>
						<th>Genre</th>
						<th>Language</th>
						<th>Rating</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{movies.map((movie) => (
						<tr key={movie.id}>
							<td>{movie.name}</td>
							<td>{movie.genre.join(', ')}</td>
							<td>{movie.language.join(', ')}</td>
							<td>{movie.rating}</td>
							<td>
								<Button
									size='sm'
									onClick={() => openModal(movie)}
								>
									Edit
								</Button>{' '}
								<Button
									size='sm'
									variant='danger'
									onClick={() => deleteMovie(movie.id)}
								>
									Delete
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>

			<Modal
				show={showModal}
				onHide={() => setShowModal(false)}
				size='lg'
			>
				<Modal.Header closeButton>
					<Modal.Title>{editingMovie ? 'Edit Movie' : 'Add Movie'}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control
								name='name'
								value={formData.name}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Description</Form.Label>
							<Form.Control
								name='description'
								value={formData.description}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Cast (comma separated)</Form.Label>
							<Form.Control
								name='cast'
								value={formData.cast}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Cast Image URLs (comma separated)</Form.Label>
							<Form.Control
								name='castImageUrl'
								value={formData.castImageUrl}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Poster URL</Form.Label>
							<Form.Control
								name='posterUrl'
								value={formData.posterUrl}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Genre (comma separated)</Form.Label>
							<Form.Control
								name='genre'
								value={formData.genre}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Language (comma separated)</Form.Label>
							<Form.Control
								name='language'
								value={formData.language}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Rating</Form.Label>
							<Form.Control
								name='rating'
								value={formData.rating}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Timings (comma separated)</Form.Label>
							<Form.Control
								name='timing'
								value={formData.timing}
								onChange={handleChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>Theater</Form.Label>
							<Form.Select
								name='theaterId'
								value={formData.theaterId}
								onChange={handleChange}
							>
								<option value=''>-- Select --</option>
								{theaters.map((theater) => (
									<option
										key={theater.id}
										value={theater.id}
									>
										{theater.name} - {theater.location}
									</option>
								))}
							</Form.Select>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={saveMovie}>Save</Button>
					<Button
						variant='secondary'
						onClick={() => setShowModal(false)}
					>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default MoviesAdmin;
