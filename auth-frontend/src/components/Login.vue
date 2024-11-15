<template>
    <div>
      <h2>Login Page</h2>
      <form @submit.prevent="login">
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="email" id="email" />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" id="password" />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Belum punya akun? <router-link to="/register">Daftar di sini</router-link></p>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '../stores/auth';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async login() {
        const authStore = useAuthStore();
        try {
          await authStore.login({ email: this.email, password: this.password });
          alert('Login sukses!');
        } catch (error) {
          alert('Login gagal: ' + error.message);
        }
      },
    },
  };
  </script>
  