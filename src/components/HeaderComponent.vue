<template>
  <header class="header">
    <div class="logo">
      <img src="https://i.imgur.com/k019KSe.png" alt="MyMD Logo">
    </div>
    <nav class="nav-links">
      <router-link to="/home">Home</router-link>
      <router-link v-if="userRole === 'user'" to="/appointments">Appointments</router-link>
      <router-link v-if="userRole === 'doctor'" to="/doctor-appointments">My Appointments</router-link>
      <router-link v-if="userRole === 'doctor'" to="/manage-schedule">Manage Schedule</router-link>
      <router-link to="/records">Medical Records</router-link>
    </nav>
    <div class="user-info">
      <span v-if="username">Welcome, {{ username }}</span>
      <span v-else><router-link to="/login">Login</router-link></span>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      username: null, 
      userRole: null, 
    };
  },
  mounted() {
    this.username = localStorage.getItem('username') || null;
    this.userRole = localStorage.getItem('role') || null; 
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f9fa;
}

.logo img {
  height: 50px; 
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  text-decoration: none;
  color: #333;
}

.user-info {
  font-weight: bold;
}
</style>