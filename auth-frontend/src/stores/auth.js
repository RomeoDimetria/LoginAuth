import { defineStore } from 'pinia';
import axios from 'axios';

const api = 'http://127.0.0.1:8000/api'; // URL backend Laravel

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('auth_token') || null,
    }),
    actions: {
        async register(userData) {
            try {
                const response = await axios.post(`${api}/register`, userData);
                this.token = response.data.token;
                this.user = response.data.data;
                localStorage.setItem('auth_token', this.token);
            } catch (error) {
                console.error('Register Error:', error.response.data);
                throw error;
            }
        },
        async login(credentials) {
            try {
                const response = await axios.post(`${api}/login`, credentials);
                this.token = response.data.token;
                localStorage.setItem('auth_token', this.token);
            } catch (error) {
                console.error('Login Error:', error.response.data);
                throw error;
            }
        },
        async logout() {
            try {
                await axios.post(
                    `${api}/logout`,
                    {},
                    { headers: { Authorization: `Bearer ${this.token}` } }
                );
                this.token = null;
                this.user = null;
                localStorage.removeItem('auth_token');
            } catch (error) {
                console.error('Logout Error:', error.response.data);
                throw error;
            }
        },
    },
});
