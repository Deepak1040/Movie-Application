import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
	const [form, setForm] = useState({ name: '', email: '', message: '' });
	const [success, setSuccess] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		axios
			.post('http://localhost:8080/api/contact', form)
			.then(() => {
				setSuccess(true);
				setForm({ name: '', email: '', message: '' });
			})
			.catch(() => alert('Message failed to send'));
	};

	return (
		<div className='container mt-5'>
			<h3>📬 Contact Us</h3>

			{success && (
				<div className='alert alert-success'>Message sent successfully!</div>
			)}

			<form
				onSubmit={handleSubmit}
				className='row g-3'
			>
				<div className='col-md-6'>
					<input
						className='form-control'
						name='name'
						placeholder='Your Name'
						value={form.name}
						onChange={handleChange}
						required
					/>
				</div>
				<div className='col-md-6'>
					<input
						className='form-control'
						name='email'
						type='email'
						placeholder='Your Email'
						value={form.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div className='col-12'>
					<textarea
						className='form-control'
						name='message'
						placeholder='Your Message'
						rows='5'
						value={form.message}
						onChange={handleChange}
						required
					/>
				</div>
				<div className='col-12'>
					<button className='btn btn-primary'>Send Message</button>
				</div>
			</form>
		</div>
	);
};

export default Contact;
