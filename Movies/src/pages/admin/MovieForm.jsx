import React, { useEffect, useState } from 'react';
import { addMovie, getMovieById, updateMovie } from '../../api/movies';
import { useNavigate, useParams } from 'react-router-dom';

const MovieForm = () => {
	const { id } = useParams();
	const isEdit = Boolean(id);
	const navigate = useNavigate();

	const [form, setForm] = useState({
		title: '',
		language: '',
		duration: '',
		description: '',
		image: '',
	});

	useEffect(() => {
		if (isEdit) {
			getMovieById(id).then((res) => setForm(res.data));
		}
	}, [id]);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (isEdit) {
				await updateMovie(id, form);
				alert('Movie updated!');
			} else {
				await addMovie(form);
				alert('Movie added!');
			}
			navigate('/admin/movies');
		} catch (err) {
			console.error(err);
			alert('Something went wrong.');
		}
	};

	return (
		<div className='container mt-4'>
			<h3>{isEdit ? '✏️ Edit Movie' : '➕ Add Movie'}</h3>
			<form onSubmit={handleSubmit}>
				<input
					name='title'
					value={form.title}
					onChange={handleChange}
					className='form-control mb-3'
					placeholder='Title'
					required
				/>
				<input
					name='language'
					value={form.language}
					onChange={handleChange}
					className='form-control mb-3'
					placeholder='Language'
					required
				/>
				<input
					name='duration'
					value={form.duration}
					onChange={handleChange}
					className='form-control mb-3'
					placeholder='Duration (mins)'
					required
				/>
				<textarea
					name='description'
					value={form.description}
					onChange={handleChange}
					className='form-control mb-3'
					placeholder='Description'
					required
				/>
				<input
					name='image'
					value={form.image}
					onChange={handleChange}
					className='form-control mb-3'
					placeholder='Poster image URL'
					required
				/>
				<button
					type='submit'
					className='btn btn-primary'
				>
					{isEdit ? 'Update' : 'Add'}
				</button>
			</form>
		</div>
	);
};

export default MovieForm;
