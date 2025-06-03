import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../../api/axios';

const MoviesAdmin = () => {
	const [movies, setMovies] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [theaters, setTheaters] = useState([]);
	const [selectedTheaterId, setSelectedTheaterId] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const [editingId, setEditingId] = useState(null);

	const [form, setForm] = useState(initialForm());

	function initialForm() {
		return {
			name: '',
			title: '',
			description: '',
			genre: '',
			language: '',
			rating: '',
			posterUrl: '',
			trailerUrl: '',
			cast: '',
			castImageUrl: '',
			timing: '',
			comingSoon: false,
		};
	}

	const fetchMovies = () => {
		api
			.get('/movies')
			.then((res) => setMovies(res.data))
			.catch((err) => console.error('❌ Fetch movies error:', err));
	};

	const fetchTheaters = () => {
		api
			.get('/admin/theaters')
			.then((res) => setTheaters(res.data))
			.catch((err) => console.error('❌ Fetch theaters error:', err));
	};

	useEffect(() => {
		fetchMovies();
		fetchTheaters();
	}, []);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
	};

	const openAddModal = () => {
		setForm(initialForm());
		setSelectedTheaterId('');
		setIsEditing(false);
		setEditingId(null);
		setShowModal(true);
	};

	const openEditModal = (movie) => {
		const castNames = movie.castMembers?.map((c) => c.name).join(', ') || '';
		const castImageUrls =
			movie.castMembers?.map((c) => c.imageUrl).join(', ') || '';
		setForm({
			name: movie.name || '',
			title: movie.title || '',
			description: movie.description || '',
			genre: movie.genre || '',
			language: movie.language || '',
			rating: movie.rating || '',
			posterUrl: movie.posterUrl || '',
			trailerUrl: movie.trailerUrl || '',
			cast: castNames,
			castImageUrl: castImageUrls,
			timing: Array.isArray(movie.timing)
				? movie.timing.join(', ')
				: movie.timing || '',
			comingSoon: movie.comingSoon || false,
		});
		setSelectedTheaterId(movie.theaterId || '');
		setIsEditing(true);
		setEditingId(movie.id);
		setShowModal(true);
	};

	const handleSave = () => {
		if (!selectedTheaterId) {
			alert('Please select a theater.');
			return;
		}

		const castNames = form.cast.split(',').map((c) => c.trim());
		const castImageUrls = form.castImageUrl.split(',').map((url) => url.trim());

		if (castNames.length !== castImageUrls.length) {
			alert('⚠️ Number of cast names and image URLs must match.');
			return;
		}

		const castMembers = castNames.map((name, i) => ({
			name,
			imageUrl: castImageUrls[i],
		}));

		const movieData = {
			...form,
			castMembers,
			timing: form.timing.split(',').map((t) => t.trim()),
			theaterId: selectedTheaterId,
		};

		const req = isEditing
			? api.put(`/admin/movies/${editingId}`, movieData)
			: api.post('/admin/movies', movieData);

		req
			.then(() => {
				alert(`✅ Movie ${isEditing ? 'updated' : 'added'}!`);
				setShowModal(false);
				setForm(initialForm());
				setSelectedTheaterId('');
				setIsEditing(false);
				setEditingId(null);
				fetchMovies();
			})
			.catch((err) => {
				console.error('❌ Save failed:', err);
				alert('❌ Could not save movie. Check required fields.');
			});
	};

	const handleDelete = (id) => {
		if (window.confirm('Are you sure you want to delete this movie?')) {
			api
				.delete(`/admin/movies/${id}`)
				.then(() => {
					alert('🗑️ Movie deleted');
					setMovies(movies.filter((m) => m.id !== id));
				})
				.catch((err) => {
					console.error('❌ Delete failed:', err);
					alert('❌ Could not delete movie.');
				});
		}
	};

	return (
		<div className='container'>
			<h3 className='mt-3'>🎬 Admin - Movies</h3>
			<Button
				variant='success'
				onClick={openAddModal}
			>
				➕ Add Movie
			</Button>

			<ul className='mt-3'>
				{movies.map((m) => (
					<li key={m.id}>
						<b>{m.name}</b> — {m.genre} — 🎭 {m.language}{' '}
						<Button
							variant='warning'
							size='sm'
							className='mx-1'
							onClick={() => openEditModal(m)}
						>
							✏️ Edit
						</Button>
						<Button
							variant='danger'
							size='sm'
							onClick={() => handleDelete(m.id)}
						>
							🗑️ Delete
						</Button>
					</li>
				))}
			</ul>

			<Modal
				show={showModal}
				onHide={() => setShowModal(false)}
			>
				<Modal.Header closeButton>
					<Modal.Title>{isEditing ? 'Edit Movie' : 'Add Movie'}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						{[
							['name', 'Name'],
							['title', 'Title'],
							['description', 'Description'],
							['genre', 'Genre'],
							['language', 'Language'],
							['rating', 'Rating (e.g. 8.5)'],
							['posterUrl', 'Poster URL'],
							['trailerUrl', 'Trailer URL'],
							['cast', 'Cast Names (comma separated)'],
							['castImageUrl', 'Cast Image URLs (comma separated)'],
							['timing', 'Timings (comma separated)'],
						].map(([name, label]) => (
							<Form.Control
								key={name}
								name={name}
								placeholder={label}
								className='my-2'
								value={form[name]}
								onChange={handleChange}
							/>
						))}

						<Form.Select
							value={selectedTheaterId}
							onChange={(e) => setSelectedTheaterId(e.target.value)}
							className='my-2'
							required
						>
							<option value=''>🎭 Select Theater</option>
							{theaters.map((t) => (
								<option
									key={t.id}
									value={t.id}
								>
									{t.name} - {t.location} - 🎟️ Screen {t.screenNumber}
								</option>
							))}
						</Form.Select>

						<Form.Check
							type='checkbox'
							name='comingSoon'
							label='Coming Soon'
							checked={form.comingSoon}
							onChange={handleChange}
							className='my-2'
						/>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='secondary'
						onClick={() => setShowModal(false)}
					>
						Cancel
					</Button>
					<Button
						variant='primary'
						onClick={handleSave}
					>
						{isEditing ? 'Update' : 'Save'}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default MoviesAdmin;
