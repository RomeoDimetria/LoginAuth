<template>
    <div>
      <h2>Register Page</h2>
      <form @submit.prevent="register">
        <div>
          <label for="name">Name:</label>
          <input type="text" v-model="name" id="name" />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="email" id="email" />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" id="password" />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>Sudah punya akun? <router-link to="/login">Login di sini</router-link></p>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '../stores/auth';
  
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
      };
    },
    methods: {
      async register() {
        const authStore = useAuthStore();
        try {
          await authStore.register({ name: this.name, email: this.email, password: this.password });
          alert('Registrasi sukses!');
        } catch (error) {
          alert('Registrasi gagal: ' + error.message);
        }
      },
    },
  };
  </script>
  