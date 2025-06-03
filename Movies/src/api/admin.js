import api from './axios';

export const getAdminStats = () => api.get('/admin/dashboard');





export const getContactMessages = () => api.get('/admin/contacts');
