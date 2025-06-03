import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

const Dashboard = () => {
	const navigate = useNavigate();

	return (
		<Container className='mt-5 text-center'>
			<h2 className='mb-4'>👨‍💼 Admin Dashboard</h2>
			<Row className='justify-content-center'>
				<Col
					xs={12}
					md={4}
					className='mb-3'
				>
					<Button
						variant='danger'
						size='lg'
						className='w-100'
						onClick={() => navigate('/admin/movies')}
					>
						🎬 Manage Movies
					</Button>
				</Col>
				<Col
					xs={12}
					md={4}
					className='mb-3'
				>
					<Button
						variant='dark'
						size='lg'
						className='w-100'
						onClick={() => navigate('/admin/bookings')}
					>
						📄 View Bookings
					</Button>
				</Col>
				<Col
					xs={12}
					md={4}
					className='mb-3'
				>
					<Button
						variant='info'
						size='lg'
						className='w-100'
						onClick={() => navigate('/admin/theaters')}
					>
						🎭 Manage Theaters
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default Dashboard;
