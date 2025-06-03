import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import axios from '../../api/axios'; // Axios instance with token

function TheatersAdmin() {
	const [theaters, setTheaters] = useState([]);
	const [show, setShow] = useState(false);
	const [form, setForm] = useState({
		name: '',
		location: '',
		screenNumber: '',
	});
	const [editId, setEditId] = useState(null);

	useEffect(() => {
		fetchTheaters();
	}, []);

	const fetchTheaters = async () => {
		try {
			const res = await axios.get('/admin/theaters');
			setTheaters(res.data);
		} catch (err) {
			console.error('❌ Failed to load theaters:', err);
		}
	};

	const handleShow = (theater = null) => {
		if (theater) {
			setEditId(theater.id);
			setForm({
				name: theater.name,
				location: theater.location,
				screenNumber: theater.screenNumber,
			});
		} else {
			setEditId(null);
			setForm({ name: '', location: '', screenNumber: '' });
		}
		setShow(true);
	};

	const handleClose = () => {
		setShow(false);
		setEditId(null);
		setForm({ name: '', location: '', screenNumber: '' });
	};

	const handleSubmit = async () => {
		if (!form.name || !form.location || !form.screenNumber) {
			alert('All fields are required.');
			return;
		}

		try {
			if (editId) {
				await axios.put(`/admin/theaters/${editId}`, {
					...form,
					screenNumber: Number(form.screenNumber),
				});
			} else {
				await axios.post('/admin/theaters', {
					...form,
					screenNumber: Number(form.screenNumber),
				});
			}
			fetchTheaters();
			handleClose();
		} catch (err) {
			console.error('❌ Save failed:', err.response || err.message);
			alert('Failed to save theater. Please check console.');
		}
	};

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this theater?')) {
			try {
				await axios.delete(`/admin/theaters/${id}`);
				fetchTheaters();
			} catch (err) {
				console.error('❌ Delete failed:', err);
				alert('Failed to delete theater.');
			}
		}
	};

	return (
		<div className='container mt-4'>
			<h2>Theater Management</h2>
			<Button
				variant='primary'
				onClick={() => handleShow()}
			>
				➕ Add Theater
			</Button>

			<Table
				striped
				bordered
				hover
				responsive
				className='mt-3'
			>
				<thead>
					<tr>
						<th>Name</th>
						<th>Location</th>
						<th>Screen Number</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{theaters.map((theater) => (
						<tr key={theater.id}>
							<td>{theater.name}</td>
							<td>{theater.location}</td>
							<td>{theater.screenNumber}</td>
							<td>
								<Button
									variant='info'
									size='sm'
									className='me-2'
									onClick={() => handleShow(theater)}
								>
									✏️ Edit
								</Button>
								<Button
									variant='danger'
									size='sm'
									onClick={() => handleDelete(theater.id)}
								>
									🗑 Delete
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>

			<Modal
				show={show}
				onHide={handleClose}
			>
				<Modal.Header closeButton>
					<Modal.Title>{editId ? 'Edit Theater' : 'Add Theater'}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId='formName'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								value={form.name}
								onChange={(e) => setForm({ ...form, name: e.target.value })}
								required
							/>
						</Form.Group>

						<Form.Group
							controlId='formLocation'
							className='mt-3'
						>
							<Form.Label>Location</Form.Label>
							<Form.Control
								type='text'
								value={form.location}
								onChange={(e) => setForm({ ...form, location: e.target.value })}
								required
							/>
						</Form.Group>

						<Form.Group
							controlId='formScreenNumber'
							className='mt-3'
						>
							<Form.Label>Screen Number</Form.Label>
							<Form.Control
								type='number'
								value={form.screenNumber}
								onChange={(e) =>
									setForm({ ...form, screenNumber: e.target.value })
								}
								required
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='secondary'
						onClick={handleClose}
					>
						❌ Cancel
					</Button>
					<Button
						variant='primary'
						onClick={handleSubmit}
					>
						{editId ? 'Update' : 'Create'}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default TheatersAdmin;
